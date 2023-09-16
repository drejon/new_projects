export interface Todo {
    id: string
    title: string
    completed: boolean
}

export type TodoId = Pick<id>
export type TodoTitle = Pick<title>
export type TodoCompleted = Pick<Completed>

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]