import { useState } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTodoStore } from "@/store/todos"

export function TodoInput() {
  const [input, setInput] = useState("")
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      addTodo(input.trim())
      setInput("")
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex gap-3"
    >
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="新しいタスクを追加..."
        className="flex-1"
      />
      <Button type="submit" disabled={!input.trim()}>
        <Plus className="h-5 w-5" />
        追加
      </Button>
    </motion.form>
  )
}
