import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Priority = "low" | "medium" | "high"

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
  priority: Priority
  dueDate?: number
}

interface TodoStore {
  todos: Todo[]
  addTodo: (text: string, priority?: Priority, dueDate?: number) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, updates: Partial<Omit<Todo, "id">>) => void
  clearCompleted: () => void
  reorderTodos: (startIndex: number, endIndex: number) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (text, priority = "medium", dueDate) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text,
          completed: false,
          createdAt: Date.now(),
          priority,
          dueDate,
        }
        set((state) => ({ todos: [newTodo, ...state.todos] }))
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }))
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }))
      },

      updateTodo: (id, updates) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        }))
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }))
      },

      reorderTodos: (startIndex, endIndex) => {
        set((state) => {
          const result = Array.from(state.todos)
          const [removed] = result.splice(startIndex, 1)
          result.splice(endIndex, 0, removed)
          return { todos: result }
        })
      },
    }),
    {
      name: "todo-storage",
    }
  )
)
