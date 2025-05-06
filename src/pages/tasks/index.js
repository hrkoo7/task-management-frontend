// pages/tasks/index.js
import { Button, Heading, Stack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api'
import ProtectedRoute from '../../components/ProtectedRoute'
import TaskList from '../../components/TaskList'
import { TaskListSkeleton } from '../../components/LoadingSkeletons'

export default function TaskListPage() {
  const { user, loading: authLoading } = useAuth()
  const [tasks, setTasks]     = useState([])
  const [loading, setLoading] = useState(true)
  const router                = useRouter()

  useEffect(() => {
    // 1) Don’t do anything until AuthContext has finished initializing
    if (authLoading) return

    // 2) If there’s no user, kick back to login
    if (!user) {
      router.replace('/login')
      return
    }

    // 3) Now that we have a token/header, fetch tasks
    api
      .get('/api/tasks')
      .then(({ data }) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err))
      .finally(() => setLoading(false))
  }, [authLoading, user, router])

  // Show skeleton while either auth or data is loading
  if (authLoading || loading) {
    return <TaskListSkeleton />
  }

  return (
    <ProtectedRoute>
      <Stack spacing={4} p={4}>
        <Heading>Tasks</Heading>
        <Button colorScheme="blue" onClick={() => router.push('/tasks/new')}>
          Create New Task
        </Button>
        <TaskList
          tasks={tasks}
          onEdit={(task) => router.push(`/tasks/${task.id}`)}
          onDelete={async (taskId) => {
            try {
              await api.delete(`/api/tasks/${taskId}`)
              setTasks((prev) => prev.filter((t) => t.id !== taskId))
            } catch (err) {
              console.error('Error deleting task:', err)
            }
          }}
        />
      </Stack>
    </ProtectedRoute>
  )
}
