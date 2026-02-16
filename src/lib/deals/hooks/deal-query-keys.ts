export const dealQueryKeys = {
  all: ['deals'] as const,
  lists: () => [...dealQueryKeys.all, 'list'] as const,
  detail: (id: string) => [...dealQueryKeys.all, 'detail', id] as const,
  notes: (dealId: string) => [...dealQueryKeys.all, 'notes', dealId] as const,
}
