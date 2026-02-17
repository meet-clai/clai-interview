'use client'

import { DealNotes } from "@/components/deal-notes"
import { useCreateDealNote } from "@/lib/deals/hooks/use-create-deal-note"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Home() {
  const [dealId, setDealId] = useState('deal-1')
  const [noteContent, setNoteContent] = useState('')
  const [isPinned, setIsPinned] = useState(false)
  const createNote = useCreateDealNote()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!noteContent.trim()) return

    try {
      await createNote.mutateAsync({
        dealId,
        data: {
          content: noteContent,
          isPinned,
        },
      })
      
      // Clear form on success
      setNoteContent('')
      setIsPinned(false)
    } catch (error) {
      console.error('Failed to create note:', error)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h1 className="text-3xl font-bold mb-2">Real Estate Deal Platform</h1>
          <p className="text-zinc-600 mb-4">Managing: Deal #{dealId}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setDealId('deal-1')}
              className={`px-4 py-2 rounded ${dealId === 'deal-1' ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-700'}`}
            >
              Deal 1 (Has Notes)
            </button>
            <button
              onClick={() => setDealId('deal-2')}
              className={`px-4 py-2 rounded ${dealId === 'deal-2' ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-700'}`}
            >
              Deal 2 (Empty)
            </button>
          </div>
        </div>

        {/* Add Note Form */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Note</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-zinc-700 mb-2">
                Note Content
              </label>
              <textarea
                id="content"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
                placeholder="Enter note content (1-2000 characters)..."
                maxLength={2000}
              />
              <p className="text-sm text-zinc-500 mt-1">
                {noteContent.length}/2000 characters
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPinned"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isPinned" className="text-sm font-medium text-zinc-700">
                Pin this note
              </label>
            </div>

            <Button
              type="submit"
              disabled={!noteContent.trim() || createNote.isPending}
            >
              {createNote.isPending ? 'Adding...' : 'Add Note'}
            </Button>
          </form>
        </div>

        {/* Notes List */}
        <DealNotes dealId={dealId} />
      </div>
    </div>
  )
}

