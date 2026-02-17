'use client'

import { useListDealNotes } from '@/lib/deals/hooks/use-list-deal-notes'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface DealNotesProps {
  dealId: string
}

// Helper function to format relative time
function formatRelativeTime(timestamp: string): string {
  const now = Date.now()
  const past = new Date(timestamp).getTime()
  const diffMs = now - past
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
}

export function DealNotes({ dealId }: DealNotesProps) {
  const { data, isLoading, isError, error, refetch } = useListDealNotes(dealId)

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Deal Notes</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Deal Notes</h2>
        <Card className="border-red-200 bg-red-50">
          <CardContent>
            <div className="space-y-3">
              <p className="text-red-800 font-medium">
                Error loading notes
              </p>
              <p className="text-red-600 text-sm">
                {error?.message || 'An unexpected error occurred'}
              </p>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Sort notes: pinned notes first, then by creation date (newest first)
  const sortedNotes = data?.notes
    ? [...data.notes].sort((a, b) => {
        // Pinned notes come first
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        
        // Then sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    : []

  // Empty state
  if (!sortedNotes.length) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Deal Notes</h2>
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              className="w-12 h-12 text-zinc-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-zinc-600 font-medium">No notes yet</p>
            <p className="text-zinc-500 text-sm mt-1">
              Be the first to add a note to this deal
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Notes list
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Deal Notes</h2>
        <span className="text-sm text-zinc-500">
          {data?.totalCount} {data?.totalCount === 1 ? 'note' : 'notes'}
        </span>
      </div>
      
      <div className="space-y-3">
        {sortedNotes.map((note) => (
          <Card key={note.id} className={note.isPinned ? 'border-blue-300 bg-blue-50' : ''}>
            <CardContent>
              <div className="space-y-2">
                {/* Header with pin indicator */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-zinc-900 whitespace-pre-wrap break-words">
                      {note.content}
                    </p>
                  </div>
                  {note.isPinned && (
                    <div className="flex-shrink-0" title="Pinned">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78.146 1.632.91 1.959l.464.244a1 1 0 11-.888 1.79l-.464-.244c-1.53-.826-2.322-2.554-1.82-4.282l.818-2.552-1.835-.73a1 1 0 01.894-1.79l3.535 1.414 2.125-1.062-1.536-4.786a1 1 0 011.91-.616l1.536 4.786 1.126-.563a1 1 0 01.894 1.788l-1.835.73c-.294.117-.63.093-.905-.066L10 9.167a1 1 0 01-.546-.818V3a1 1 0 10-2 0v5.349a1 1 0 01-.454.836z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Footer with author and time */}
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="font-medium">{note.createdByName}</span>
                  <span>•</span>
                  <span>{formatRelativeTime(note.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
