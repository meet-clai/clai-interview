// Base deal type
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

// Constants for query configuration
export const STALE_TIME = 5 * 60 * 1000  // 5 minutes
export const GC_TIME = 10 * 60 * 1000    // 10 minutes
