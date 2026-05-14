import * as jsonStore from './jsonStore.js'
import * as prismaStore from './prismaStore.js'

const productionStore = process.env.STORE_DRIVER === 'prisma'
const store = productionStore ? prismaStore : jsonStore

export const createOrder = store.createOrder
export const listOrders = store.listOrders
export const updateOrderStatus = store.updateOrderStatus
export const createSupportRequest = store.createSupportRequest
export const listSupportRequests = store.listSupportRequests
export const updateSupportRequest = store.updateSupportRequest
