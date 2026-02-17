export interface Deal {
  id: string
  name: string
  description?: string
  category: 'real_estate'
  transactionType: 'sale' | 'lease'
  status: 'draft' | 'active' | 'closed'
  createdAt: string
  updatedAt: string
}

export type CreateDealInput = Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateDealInput = Partial<CreateDealInput> & { id: string }
