import { Deal, CreateDealInput, UpdateDealInput } from '../types/deal'
import { MOCK_DEALS } from '../mocks/deals'

const SIMULATED_DELAY = 300

let deals: Deal[] = [...MOCK_DEALS]
let nextId = deals.length + 1

function delay(ms = SIMULATED_DELAY) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

export async function getDeals(): Promise<Deal[]> {
  await delay()
  return [...deals]
}

export async function getDeal(id: string): Promise<Deal> {
  await delay()
  const deal = deals.find(d => d.id === id)
  if (!deal) throw new Error(`Deal not found: ${id}`)
  return { ...deal }
}

export async function createDeal(input: CreateDealInput): Promise<Deal> {
  await delay()
  const now = new Date().toISOString()
  const deal: Deal = {
    ...input,
    id: String(nextId++),
    createdAt: now,
    updatedAt: now,
  }
  deals = [...deals, deal]
  return deal
}

export async function updateDeal(input: UpdateDealInput): Promise<Deal> {
  await delay()
  const index = deals.findIndex(d => d.id === input.id)
  if (index === -1) throw new Error(`Deal not found: ${input.id}`)

  const { id, ...changes } = input
  const updated: Deal = {
    ...deals[index],
    ...changes,
    updatedAt: new Date().toISOString(),
  }
  deals = deals.map(d => (d.id === id ? updated : d))
  return updated
}

export async function deleteDeal(id: string): Promise<void> {
  await delay()
  const index = deals.findIndex(d => d.id === id)
  if (index === -1) throw new Error(`Deal not found: ${id}`)
  deals = deals.filter(d => d.id !== id)
}
