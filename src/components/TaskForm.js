// components/TaskForm.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Stack,
} from '@chakra-ui/react';

export default function TaskForm({ initialData }) {
  const [task, setTask] = useState(initialData || {
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
    status: 'TODO',
    assignedToId: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await api.put(`/api/tasks/${initialData.id}`, task);
      } else {
        await api.post('/api/tasks', task);
      }
      router.push('/tasks');
    } catch (err) {
      alert('Error saving task');
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={8} p={6} boxShadow="md" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={task.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Priority</FormLabel>
            <Select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="DONE">DONE</option>
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">PENDING</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Assigned To</FormLabel>
            <Input
              name="assignedToId"
              value={task.assignedToId}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            {initialData ? 'Update Task' : 'Create Task'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

