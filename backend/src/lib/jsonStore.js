import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.resolve(__dirname, '../../data')
const ordersFile = path.join(dataDir, 'orders.json')
const supportFile = path.join(dataDir, 'support.json')

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true })
}

async function readJson(file, fallback) {
  try {
    const raw = await readFile(file, 'utf8')
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

async function writeJson(file, value) {
  await ensureDataDir()
  await writeFile(file, JSON.stringify(value, null, 2), 'utf8')
}

export async function createOrder(data) {
  const orders = await readJson(ordersFile, [])
  const now = new Date().toISOString()
  const order = {
    id: randomUUID(),
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail ?? null,
    address: data.address,
    comment: data.comment ?? null,
    paymentMethod: data.paymentMethod,
    status: 'NEW',
    adminNote: null,
    confirmedAt: null,
    total: data.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    createdAt: now,
    items: data.items.map((item) => ({
      id: randomUUID(),
      productId: item.productId,
      name: item.name,
      qty: item.qty,
      unit: item.unit,
      price: item.price,
    })),
  }

  orders.unshift(order)
  await writeJson(ordersFile, orders)
  return order
}

export async function listOrders() {
  return readJson(ordersFile, [])
}

export async function updateOrderStatus(id, data) {
  const orders = await readJson(ordersFile, [])
  const index = orders.findIndex((order) => order.id === id)
  if (index === -1) return null

  orders[index] = {
    ...orders[index],
    status: data.status,
    adminNote: data.adminNote ?? null,
    confirmedAt: data.status === 'CONFIRMED' ? new Date().toISOString() : orders[index].confirmedAt,
  }

  await writeJson(ordersFile, orders)
  return orders[index]
}

export async function createSupportRequest(data) {
  const requests = await readJson(supportFile, [])
  const request = {
    id: randomUUID(),
    name: data.name,
    phone: data.phone,
    topic: data.topic,
    message: data.message,
    status: 'NEW',
    operatorNote: null,
    createdAt: new Date().toISOString(),
  }
  requests.unshift(request)
  await writeJson(supportFile, requests)
  return request
}

export async function listSupportRequests() {
  return readJson(supportFile, [])
}

export async function updateSupportRequest(id, data) {
  const requests = await readJson(supportFile, [])
  const index = requests.findIndex((request) => request.id === id)
  if (index === -1) return null
  requests[index] = {
    ...requests[index],
    status: data.status,
    operatorNote: data.operatorNote ?? requests[index].operatorNote,
  }
  await writeJson(supportFile, requests)
  return requests[index]
}
