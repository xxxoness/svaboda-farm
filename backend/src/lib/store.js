import * as jsonStore from './jsonStore.js'
import * as postgresStore from './postgresStore.js'
import * as prismaStore from './prismaStore.js'

const stores = {
  json: jsonStore,
  postgres: postgresStore,
  prisma: prismaStore,
}

const store = stores[process.env.STORE_DRIVER] || jsonStore

export const createOrder = store.createOrder
export const listOrders = store.listOrders
export const updateOrderStatus = store.updateOrderStatus
export const createSupportRequest = store.createSupportRequest
export const listSupportRequests = store.listSupportRequests
export const updateSupportRequest = store.updateSupportRequest
