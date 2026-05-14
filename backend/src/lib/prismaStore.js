import { Prisma } from '@prisma/client'
import { prisma } from './prisma.js'

function serializeOrder(order) {
  return {
    ...order,
    total: Number(order.total),
    createdAt: order.createdAt.toISOString(),
    confirmedAt: order.confirmedAt ? order.confirmedAt.toISOString() : null,
    items: order.items.map((item) => ({
      ...item,
      price: Number(item.price),
    })),
  }
}

function serializeSupportRequest(request) {
  return {
    ...request,
    createdAt: request.createdAt.toISOString(),
    updatedAt: request.updatedAt.toISOString(),
  }
}

export async function createOrder(data) {
  const total = data.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const order = await prisma.order.create({
    data: {
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail ?? null,
      address: data.address,
      comment: data.comment ?? null,
      paymentMethod: data.paymentMethod,
      total: new Prisma.Decimal(total),
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          name: item.name,
          qty: item.qty,
          unit: item.unit,
          price: new Prisma.Decimal(item.price),
        })),
      },
    },
    include: { items: true },
  })

  return serializeOrder(order)
}

export async function listOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })
  return orders.map(serializeOrder)
}

export async function updateOrderStatus(id, data) {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: {
        status: data.status,
        adminNote: data.adminNote ?? null,
        confirmedAt: data.status === 'CONFIRMED' ? new Date() : undefined,
      },
      include: { items: true },
    })
    return serializeOrder(order)
  } catch (error) {
    if (error.code === 'P2025') return null
    throw error
  }
}

export async function createSupportRequest(data) {
  const request = await prisma.supportRequest.create({
    data: {
      name: data.name,
      phone: data.phone,
      topic: data.topic,
      message: data.message,
    },
  })
  return serializeSupportRequest(request)
}

export async function listSupportRequests() {
  const requests = await prisma.supportRequest.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return requests.map(serializeSupportRequest)
}

export async function updateSupportRequest(id, data) {
  try {
    const request = await prisma.supportRequest.update({
      where: { id },
      data: {
        status: data.status,
        operatorNote: data.operatorNote ?? undefined,
      },
    })
    return serializeSupportRequest(request)
  } catch (error) {
    if (error.code === 'P2025') return null
    throw error
  }
}
