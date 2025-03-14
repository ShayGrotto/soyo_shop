import { create } from 'zustand'

import { SortValue } from '@/utils/global'

type SortState = {
    value: string
    setValue: (value: SortValue) => void
}


const useSortStore = create<SortState>((set) => ({
    value: 'latest',
    setValue: (value) => set({ value})
}))

export default useSortStore