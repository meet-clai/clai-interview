import { NextResponse } from 'next/server'
import type { DealNote } from '@/lib/deals/types/deal-note'

// Mock data for demonstration
const mockNotes: Record<string, DealNote[]> = {
  'deal-1': [
    {
      id: '1',
      dealId: 'deal-1',
      content: 'Initial property inspection completed. Foundation looks solid, minor roof repairs needed.',
      createdBy: 'user-1',
      createdByName: 'John Smith',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isPinned: true,
    },
    {
      id: '2',
      dealId: 'deal-1',
      content: 'Buyer has requested additional documents regarding property title. Will send by EOD.',
      createdBy: 'user-2',
      createdByName: 'Sarah Johnson',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      isPinned: false,
    },
    {
      id: '3',
      dealId: 'deal-1',
      content: 'Financing approved! Closing date scheduled for next Friday at 2 PM.',
      createdBy: 'user-3',
      createdByName: 'Michael Chen',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      isPinned: true,
    },
  ],
}

export async function GET(
  request: Request,
  context: { params: Promise<{ dealId: string }> }
) {
  // In Next.js 15, params is a Promise
  const { dealId } = await context.params
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const notes = mockNotes[dealId] || []
  
  return NextResponse.json({
    notes,
    totalCount: notes.length,
  })
}

export async function POST(
  request: Request,
  context: { params: Promise<{ dealId: string }> }
) {
  const { dealId } = await context.params
  
  try {
    const body = await request.json()
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Create a new note
    const newNote: DealNote = {
      id: `note-${Date.now()}`,
      dealId,
      content: body.content,
      isPinned: body.isPinned ?? false,
      createdBy: 'current-user',
      createdByName: 'Current User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add to mock data
    if (!mockNotes[dealId]) {
      mockNotes[dealId] = []
    }
    mockNotes[dealId].unshift(newNote)

    return NextResponse.json({ note: newNote }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    )
  }
}
