'use client'

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { SortBy, SortList } from "@/lib/constants"
import { useSortStore } from "@/stores"

import { SortValue } from "@/utils/global"

export default function Sort() {
    const { setValue } = useSortStore()
    const handleChange = (value: SortValue) => {
        setValue(value)
    }

    return (
        <div className="w-64 py-4">
            <p className="m-5 text-xl">{SortBy}</p>
            <ToggleGroup type="single" defaultValue="latest" onValueChange={handleChange} className="flex-col gap-3" >
                {
                    SortList.map((item, index) => (
                        <ToggleGroupItem value={item.value} key={index}>{item.text}</ToggleGroupItem>
                    ))
                }
            </ToggleGroup>
        </div>
    )
}