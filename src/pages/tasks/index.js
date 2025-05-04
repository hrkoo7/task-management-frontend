import { Button, Heading, Spinner, Stack } from '@chakra-ui/react';
import TaskList from '../../components/TaskList';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/ProtectedRoute';
import { TaskListSkeleton } from '../../components/LoadingSkeletons';

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await api.get('/api/tasks');
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  if (loading) return <TaskListSkeleton />;

  return (
    <ProtectedRoute>
      <Stack spacing={4} p={4}>
        <Heading>Tasks</Heading>
        <Button
          colorScheme="blue"
          onClick={() => router.push('/tasks/new')}
        >
          Create New Task
        </Button>
        <TaskList
          tasks={tasks}
          onEdit={(task) => router.push(`/tasks/${task.id}`)}
          onDelete={handleDelete}
        />
      </Stack>
    </ProtectedRoute>
  );
}