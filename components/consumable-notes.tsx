"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Trash2 } from "lucide-react"

interface ConsumableItem {
  id: number
  name: string
  notes: string
}

export function ConsumableNotesComponent() {
  const [items, setItems] = useState<ConsumableItem[]>([])
  const [newItem, setNewItem] = useState({ name: "", notes: "" })

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.name.trim() !== "") {
      setItems([...items, { ...newItem, id: Date.now() }])
      setNewItem({ name: "", notes: "" })
    }
  }

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#f7f3e9] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-[#6fccbf] p-6">
          <h1 className="text-3xl font-bold mb-6 text-white">消耗品ノート</h1>
          <form onSubmit={addItem} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">アイテム名</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="bg-white/90"
                placeholder="アイテム名を入力"
                aria-label="アイテム名"
              />
            </div>
            <div>
              <Label htmlFor="notes" className="text-white">メモ</Label>
              <Textarea
                id="notes"
                value={newItem.notes}
                onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                className="bg-white/90"
                placeholder="メモを入力"
                aria-label="メモ"
              />
            </div>
            <Button type="submit" className="w-full bg-[#c24236] hover:bg-[#a33a30]">
              <PlusCircle className="mr-2 h-4 w-4" /> 追加
            </Button>
          </form>
        </div>
        <div className="w-full md:w-2/3 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#c24236]">アイテムリスト</h2>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <ul className="space-y-4" aria-label="消耗品リスト">
              {items.map((item) => (
                <li key={item.id} className="bg-[#f7f3e9] p-4 rounded-md relative">
                  <h3 className="text-lg font-medium text-[#c24236]">{item.name}</h3>
                  <p className="text-gray-600 mt-2">{item.notes}</p>
                  <Button
                    onClick={() => deleteItem(item.id)}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-[#c24236] hover:text-[#a33a30]"
                    aria-label={`${item.name}を削除`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}