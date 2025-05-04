// pages/tasks/new.js

import TaskForm from '../../components/TaskForm';
import { Heading } from '@chakra-ui/react';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function NewTaskPage() {
  return (
    <ProtectedRoute>
      <Heading mb={4}>Create New Task</Heading>
      <TaskForm />
    </ProtectedRoute>
  );
}
