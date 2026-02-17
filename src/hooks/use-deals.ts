import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getDeals,
  getDeal,
  createDeal,
  updateDeal,
  deleteDeal,
} from '@/lib/deals/api/deals-api'
import { CreateDealInput, UpdateDealInput } from '@/lib/deals/types/deal'

const DEALS_KEY = ['deals'] as const

export function useDeals() {
  return useQuery({
    queryKey: DEALS_KEY,
    queryFn: getDeals,
  })
}

export function useDeal(id: string) {
  return useQuery({
    queryKey: [...DEALS_KEY, id],
    queryFn: () => getDeal(id),
    enabled: !!id,
  })
}

export function useCreateDeal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateDealInput) => createDeal(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEALS_KEY })
    },
  })
}

export function useUpdateDeal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateDealInput) => updateDeal(input),
    onSuccess: (deal) => {
      queryClient.invalidateQueries({ queryKey: DEALS_KEY })
      queryClient.invalidateQueries({ queryKey: [...DEALS_KEY, deal.id] })
    },
  })
}

export function useDeleteDeal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteDeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEALS_KEY })
    },
  })
}
