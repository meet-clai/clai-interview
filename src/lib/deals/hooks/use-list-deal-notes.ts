import { useQuery } from '@tanstack/react-query'
import { dealQueryKeys } from './deal-query-keys'
import { ListDealNotesResult } from '../types/deal-note'
import { STALE_TIME, GC_TIME } from '../types/deal'

export function useListDealNotes(dealId: string | undefined) {
  return useQuery({
    queryKey: dealQueryKeys.notes(dealId || ''),
    queryFn: async (): Promise<ListDealNotesResult> => {
      if (!dealId) {
        throw new Error('Deal ID is required')
      }

      const response = await fetch(`/api/deals/${dealId}/notes`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch deal notes')
      }
      
      const result = await response.json()
      return result
    },
    enabled: !!dealId,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })
}
