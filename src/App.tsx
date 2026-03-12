import { motion } from "framer-motion"
import { CheckSquare } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { TodoInput } from "@/components/TodoInput"
import { TodoList } from "@/components/TodoList"

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="p-2 rounded-lg bg-primary">
              <CheckSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FlowTodo</span>
          </motion.div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-2">今日のタスク</h1>
          <p className="text-muted-foreground">
            シンプルに、効率的にタスクを管理しましょう
          </p>
        </motion.div>

        <TodoInput />
        <TodoList />
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>FlowTodo - Modern Todo App</p>
        </div>
      </footer>
    </div>
  )
}

export default App
