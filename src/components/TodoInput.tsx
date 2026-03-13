import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Flag, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTodoStore, type Priority } from "@/store/todos"
import { cn } from "@/lib/utils"

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "低", color: "text-blue-500 bg-blue-500/10" },
  { value: "medium", label: "中", color: "text-yellow-500 bg-yellow-500/10" },
  { value: "high", label: "高", color: "text-red-500 bg-red-500/10" },
]

export function TodoInput() {
  const [input, setInput] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")
  const [showPriority, setShowPriority] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setIsAdding(true)
      addTodo(input.trim(), priority)
      setInput("")
      setTimeout(() => setIsAdding(false), 300)
    }
  }

  const currentPriority = priorities.find((p) => p.value === priority)!

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-3">
          {/* Priority Selector */}
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPriority(!showPriority)}
              className={cn("gap-2", currentPriority.color)}
            >
              <Flag className="h-4 w-4" />
              <span className="hidden sm:inline">{currentPriority.label}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", showPriority && "rotate-180")} />
            </Button>

            <AnimatePresence>
              {showPriority && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-10"
                    onClick={() => setShowPriority(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-40 bg-popover border rounded-xl shadow-xl z-20 overflow-hidden"
                  >
                    {priorities.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => {
                          setPriority(p.value)
                          setShowPriority(false)
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors",
                          priority === p.value && "bg-muted"
                        )}
                      >
                        <Flag className={cn("h-4 w-4", p.color.split(" ")[0])} />
                        <span>{p.label}優先度</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Input Field */}
          <div className="flex-1 relative">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="新しいタスクを追加..."
              className="h-11 pr-24 bg-card/50 backdrop-blur border-border/50 focus:border-primary transition-all"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={!input.trim()}
                  size="sm"
                  className={cn(
                    "h-9 px-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25 transition-all",
                    isAdding && "scale-95"
                  )}
                >
                  <Plus className={cn("h-4 w-4 mr-1 transition-transform", isAdding && "rotate-180")} />
                  追加
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Keyboard hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-muted-foreground mt-2 text-center"
        >
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Enter</kbd> で追加
        </motion.p>
      </form>
    </motion.div>
  )
}
