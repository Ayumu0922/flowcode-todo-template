import { motion } from "framer-motion"
import { CheckCircle2, Clock, AlertTriangle, Target } from "lucide-react"
import { useTodoStore } from "@/store/todos"

export function StatsPanel() {
  const { todos } = useTodoStore()

  const totalCount = todos.length
  const completedCount = todos.filter((t) => t.completed).length
  const activeCount = totalCount - completedCount
  const highPriorityCount = todos.filter((t) => t.priority === "high" && !t.completed).length
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const stats = [
    {
      icon: Target,
      label: "完了率",
      value: `${completionRate}%`,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: CheckCircle2,
      label: "完了",
      value: completedCount,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-500/10",
    },
    {
      icon: Clock,
      label: "未完了",
      value: activeCount,
      color: "from-purple-500 to-violet-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: AlertTriangle,
      label: "高優先度",
      value: highPriorityCount,
      color: "from-red-500 to-orange-500",
      bg: "bg-red-500/10",
    },
  ]

  if (totalCount === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-4 rounded-2xl bg-card/50 backdrop-blur border border-border/50 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 bg-gradient-to-r ${stat.color} bg-clip-text`} style={{ color: stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('green') ? '#22c55e' : stat.color.includes('purple') ? '#8b5cf6' : '#ef4444' }} />
            </div>
            <div>
              <motion.p
                className="text-2xl font-bold"
                key={stat.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
