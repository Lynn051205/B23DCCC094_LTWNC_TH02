import { create } from 'zustand'

interface PinStore {
  pinnedIds: string[]
  togglePin: (id: string) => void
  isPinned: (id: string) => boolean
  clearPins: () => void
}

export const usePinStore = create<PinStore>((set, get) => ({
  pinnedIds: [],
  togglePin: (id) =>
    set((state) => ({
      pinnedIds: state.pinnedIds.includes(id)
        ? state.pinnedIds.filter((pinnedId) => pinnedId !== id)
        : [...state.pinnedIds, id],
    })),
  isPinned: (id) => get().pinnedIds.includes(id),
  clearPins: () => set({ pinnedIds: [] }),
}))
