import { z } from 'zod'

// DealNote type - represents a note on a deal
export interface DealNote {
  id: string
  dealId: string
  content: string
  createdBy: string
  createdByName: string
  createdAt: string
  updatedAt: string
  isPinned: boolean
}

// API response type for listing notes
export interface ListDealNotesResult {
  notes: DealNote[]
  totalCount: number
}

// Zod schema for creating a note
export const createDealNoteSchema = z.object({
  content: z.string().min(1, 'Content is required').max(2000, 'Content must be 2000 characters or less'),
  isPinned: z.boolean().optional().default(false),
})

// Infer the TypeScript type from the Zod schema
export type CreateDealNoteInput = z.infer<typeof createDealNoteSchema>
