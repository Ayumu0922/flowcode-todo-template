import { motion } from "framer-motion"
import { Trash2, Flag, Sparkles } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTodoStore, type Todo, type Priority } from "@/store/todos"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface TodoItemProps {
  todo: Todo
}

const priorityConfig: Record<Priority, { label: string; color: string; bg: string }> = {
  low: { label: "低", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
  medium: { label: "中", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
  high: { label: "高", color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore()
  const [showConfetti, setShowConfetti] = useState(false)

  const handleToggle = () => {
    if (!todo.completed) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1000)
    }
    toggleTodo(todo.id)
  }

  const cyclePriority = () => {
    const priorities: Priority[] = ["low", "medium", "high"]
    const currentIndex = priorities.indexOf(todo.priority)
    const nextPriority = priorities[(currentIndex + 1) % priorities.length]
    updateTodo(todo.id, { priority: nextPriority })
  }

  const priority = priorityConfig[todo.priority]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-2xl border bg-card/50 backdrop-blur transition-all hover:shadow-lg",
        todo.completed && "bg-muted/30 border-transparent",
        todo.priority === "high" && !todo.completed && "border-red-500/30 bg-red-500/5"
      )}
    >
      {/* Confetti effect */}
      {showConfetti && (
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 1],
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Priority indicator */}
      <motion.button
        onClick={cyclePriority}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "shrink-0 p-1.5 rounded-lg border transition-colors",
          priority.bg,
          priority.color
        )}
      >
        <Flag className="h-3.5 w-3.5" />
      </motion.button>

      {/* Checkbox */}
      <motion.div whileTap={{ scale: 0.9 }}>
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          className={cn(
            "h-5 w-5 rounded-full transition-all",
            todo.completed && "bg-gradient-to-r from-green-500 to-emerald-500 border-0"
          )}
        />
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <motion.span
          className={cn(
            "block transition-all",
            todo.completed && "line-through text-muted-foreground"
          )}
          animate={{ opacity: todo.completed ? 0.6 : 1 }}
        >
          {todo.text}
        </motion.span>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className={cn("text-xs px-2 py-0", priority.bg, priority.color)}>
            優先度: {priority.label}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(todo.createdAt).toLocaleDateString("ja-JP", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Delete button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteTodo(todo.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
