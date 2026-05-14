import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.PG_POOL_MAX || 1),
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 8_000,
  query_timeout: 8_000,
  statement_timeout: 8_000,
  ssl: process.env.DATABASE_URL?.includes('supabase.com') ? { rejectUnauthorized: false } : undefined,
})

let schemaReady

async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = pool.query(`
      create extension if not exists pgcrypto;

      create table if not exists orders (
        id text primary key default gen_random_uuid()::text,
        customer_name text not null,
        customer_phone text not null,
        customer_email text,
        address text not null,
        comment text,
        payment_method text not null,
        status text not null default 'NEW',
        admin_note text,
        confirmed_at timestamptz,
        total numeric not null,
        created_at timestamptz not null default now()
      );

      create table if not exists order_items (
        id text primary key default gen_random_uuid()::text,
        order_id text not null references orders(id) on delete cascade,
        product_id text not null,
        name text not null,
        qty double precision not null,
        unit text not null,
        price numeric not null
      );

      create table if not exists support_requests (
        id text primary key default gen_random_uuid()::text,
        name text not null,
        phone text not null,
        topic text not null,
        message text not null,
        status text not null default 'NEW',
        operator_note text,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );

      create index if not exists orders_created_at_idx on orders(created_at desc);
      create index if not exists support_requests_created_at_idx on support_requests(created_at desc);
    `)
  }
  await schemaReady
}

function serializeOrderRow(row, items = []) {
  return {
    id: row.id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerEmail: row.customer_email,
    address: row.address,
    comment: row.comment,
    paymentMethod: row.payment_method,
    status: row.status,
    adminNote: row.admin_note,
    confirmedAt: row.confirmed_at ? row.confirmed_at.toISOString() : null,
    total: Number(row.total),
    createdAt: row.created_at.toISOString(),
    items,
  }
}

function serializeItemRow(row) {
  return {
    id: row.id,
    productId: row.product_id,
    name: row.name,
    qty: Number(row.qty),
    unit: row.unit,
    price: Number(row.price),
  }
}

function serializeSupportRow(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    topic: row.topic,
    message: row.message,
    status: row.status,
    operatorNote: row.operator_note,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  }
}

export async function createOrder(data) {
  await ensureSchema()
  const client = await pool.connect()
  try {
    await client.query('begin')
    const total = data.items.reduce((sum, item) => sum + item.price * item.qty, 0)
    const orderResult = await client.query(
      `insert into orders (
        customer_name, customer_phone, customer_email, address, comment, payment_method, total
      ) values ($1, $2, $3, $4, $5, $6, $7)
      returning *`,
      [
        data.customerName,
        data.customerPhone,
        data.customerEmail ?? null,
        data.address,
        data.comment ?? null,
        data.paymentMethod,
        total,
      ],
    )
    const order = orderResult.rows[0]
    const items = []
    for (const item of data.items) {
      const itemResult = await client.query(
        `insert into order_items (order_id, product_id, name, qty, unit, price)
         values ($1, $2, $3, $4, $5, $6)
         returning *`,
        [order.id, item.productId, item.name, item.qty, item.unit, item.price],
      )
      items.push(serializeItemRow(itemResult.rows[0]))
    }
    await client.query('commit')
    return serializeOrderRow(order, items)
  } catch (error) {
    await client.query('rollback')
    throw error
  } finally {
    client.release()
  }
}

export async function listOrders() {
  await ensureSchema()
  const ordersResult = await pool.query('select * from orders order by created_at desc')
  const itemsResult = await pool.query('select * from order_items order by name asc')
  const itemsByOrder = new Map()
  for (const item of itemsResult.rows) {
    const list = itemsByOrder.get(item.order_id) || []
    list.push(serializeItemRow(item))
    itemsByOrder.set(item.order_id, list)
  }
  return ordersResult.rows.map((order) => serializeOrderRow(order, itemsByOrder.get(order.id) || []))
}

export async function updateOrderStatus(id, data) {
  await ensureSchema()
  const result = await pool.query(
    `update orders
     set status = $2,
         admin_note = $3,
         confirmed_at = case when $2 = 'CONFIRMED' then now() else confirmed_at end
     where id = $1
     returning *`,
    [id, data.status, data.adminNote ?? null],
  )
  if (!result.rows[0]) return null
  const items = await pool.query('select * from order_items where order_id = $1 order by name asc', [id])
  return serializeOrderRow(result.rows[0], items.rows.map(serializeItemRow))
}

export async function createSupportRequest(data) {
  await ensureSchema()
  const result = await pool.query(
    `insert into support_requests (name, phone, topic, message)
     values ($1, $2, $3, $4)
     returning *`,
    [data.name, data.phone, data.topic, data.message],
  )
  return serializeSupportRow(result.rows[0])
}

export async function listSupportRequests() {
  await ensureSchema()
  const result = await pool.query('select * from support_requests order by created_at desc')
  return result.rows.map(serializeSupportRow)
}

export async function updateSupportRequest(id, data) {
  await ensureSchema()
  const result = await pool.query(
    `update support_requests
     set status = $2,
         operator_note = coalesce($3, operator_note),
         updated_at = now()
     where id = $1
     returning *`,
    [id, data.status, data.operatorNote ?? null],
  )
  if (!result.rows[0]) return null
  return serializeSupportRow(result.rows[0])
}
