import { useMutation, useQueryClient } from '@tanstack/react-query'
import { dealQueryKeys } from './deal-query-keys'
import { CreateDealNoteInput } from '../types/deal-note'
import type { DealNote, ListDealNotesResult } from '../types/deal-note'

interface CreateDealNoteParams {
  dealId: string
  data: CreateDealNoteInput
}

export function useCreateDealNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ dealId, data }: CreateDealNoteParams): Promise<DealNote> => {
      const response = await fetch(`/api/deals/${dealId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create deal note')
      }

      const result = await response.json()
      return result.note
    },
    onMutate: async ({ dealId, data }) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: dealQueryKeys.notes(dealId) })

      // Snapshot the previous value
      const previousNotes = queryClient.getQueryData<ListDealNotesResult>(
        dealQueryKeys.notes(dealId)
      )

      // Optimistically update to the new value
      if (previousNotes) {
        const optimisticNote: DealNote = {
          id: `temp-${Date.now()}`,
          dealId,
          content: data.content,
          isPinned: data.isPinned ?? false,
          createdBy: 'current-user', // In a real app, this would come from auth context
          createdByName: 'Current User',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        queryClient.setQueryData<ListDealNotesResult>(
          dealQueryKeys.notes(dealId),
          {
            notes: [optimisticNote, ...previousNotes.notes],
            totalCount: previousNotes.totalCount + 1,
          }
        )
      }

      // Return context with the snapshot value
      return { previousNotes }
    },
    onError: (err, { dealId }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousNotes) {
        queryClient.setQueryData(
          dealQueryKeys.notes(dealId),
          context.previousNotes
        )
      }
    },
    onSettled: (data, error, { dealId }) => {
      // Always refetch after error or success to ensure we have the correct data
      queryClient.invalidateQueries({ queryKey: dealQueryKeys.notes(dealId) })
    },
  })
}
