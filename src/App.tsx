import { motion } from "framer-motion"
import { CheckSquare, Sparkles, Target, Flame, Trophy } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { TodoInput } from "@/components/TodoInput"
import { TodoList } from "@/components/TodoList"
import { StatsPanel } from "@/components/StatsPanel"
import { useTodoStore } from "@/store/todos"

function App() {
  const { todos } = useTodoStore()
  const completedCount = todos.filter((t) => t.completed).length
  const totalCount = todos.length
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  // Calculate streak (consecutive days with completed todos)
  const today = new Date().toDateString()
  const hasCompletedToday = todos.some(
    (t) => t.completed && new Date(t.createdAt).toDateString() === today
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-lg">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <motion.div
              className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckSquare className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                FlowTodo
              </span>
              <p className="text-xs text-muted-foreground">タスク管理をシンプルに</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Quick Stats */}
            <div className="hidden sm:flex items-center gap-4 mr-2">
              <motion.div
                className="flex items-center gap-1.5 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Target className="h-4 w-4 text-primary" />
                <span className="font-medium">{completionRate}%</span>
              </motion.div>
              {hasCompletedToday && (
                <motion.div
                  className="flex items-center gap-1.5 text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Today</span>
                </motion.div>
              )}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-3"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4" />
            生産性を向上させよう
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold">
            今日の
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              タスク
            </span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            シンプルで美しいタスク管理。集中して、一つずつ達成していきましょう。
          </p>
        </motion.div>

        {/* Stats Panel */}
        <StatsPanel />

        {/* Todo Input */}
        <TodoInput />

        {/* Todo List */}
        <TodoList />

        {/* Achievement Banner */}
        {completedCount >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">素晴らしい！</p>
              <p className="text-sm text-muted-foreground">
                {completedCount}個のタスクを完了しました。この調子で続けましょう！
              </p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto relative">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>FlowTodo - Modern Todo App with Priority Management</p>
        </div>
      </footer>
    </div>
  )
}

export default App
