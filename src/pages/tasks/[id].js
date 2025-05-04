// pages/tasks/[id].js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import TaskForm from '../../components/TaskForm';
import { Spinner, Heading } from '@chakra-ui/react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { TaskFormSkeleton } from '../../components/LoadingSkeletons';

export default function TaskDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await api.get(`/api/tasks/${id}`);
        setTask(data);
      } catch (error) {
        console.error('Error fetching task:', error);
        router.push('/tasks');
      }
      setLoading(false);
    };

    if (id) fetchTask();
  }, [id]);

  if (loading) return <TaskFormSkeleton />;

  return (
    <ProtectedRoute>
      <Heading mb={4}>Edit Task</Heading>
      <TaskForm initialData={task} />
    </ProtectedRoute>
  );
}


export async function getServerSideProps(context) {
  return {
    props: {}
  };
}