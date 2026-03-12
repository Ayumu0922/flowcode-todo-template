import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ListTodo, CheckCircle2, Circle, Trash2 } from "lucide-react"
import { useTodoStore } from "@/store/todos"
import { TodoItem } from "./TodoItem"
import { Button } from "@/components/ui/button"

type Filter = "all" | "active" | "completed"

export function TodoList() {
  const [filter, setFilter] = useState<Filter>("all")
  const { todos, clearCompleted } = useTodoStore()

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "secondary"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            <ListTodo className="h-4 w-4 mr-1" />
            すべて ({todos.length})
          </Button>
          <Button
            variant={filter === "active" ? "default" : "secondary"}
            size="sm"
            onClick={() => setFilter("active")}
          >
            <Circle className="h-4 w-4 mr-1" />
            未完了 ({activeCount})
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "secondary"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            完了 ({completedCount})
          </Button>
        </div>

        {completedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCompleted}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            完了を削除
          </Button>
        )}
      </div>

      {/* Todo List */}
      {filteredTodos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-muted-foreground"
        >
          <ListTodo className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p>
            {filter === "all"
              ? "タスクがありません"
              : filter === "active"
              ? "未完了のタスクはありません"
              : "完了したタスクはありません"}
          </p>
          <p className="text-sm mt-1">
            {filter === "all" && "新しいタスクを追加してください"}
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
