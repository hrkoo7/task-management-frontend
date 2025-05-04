import { Table, Thead, Tbody, Tr, Th, Td, Badge, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export default function TaskList({ tasks, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO': return 'gray';
      case 'IN_PROGRESS': return 'blue';
      case 'DONE': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Status</Th>
          <Th>Due Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task) => (
          <Tr key={task.id}>
            <Td>{task.title}</Td>
            <Td>
              <Badge colorScheme={getStatusColor(task.status)}>
                {task.status}
              </Badge>
            </Td>
            <Td>{new Date(task.dueDate).toLocaleDateString()}</Td>
            <Td>
              <IconButton
                aria-label="Edit task"
                icon={<EditIcon />}
                onClick={() => onEdit(task)}
                mr={2}
              />
              <IconButton
                aria-label="Delete task"
                icon={<DeleteIcon />}
                onClick={() => onDelete(task.id)}
                colorScheme="red"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}