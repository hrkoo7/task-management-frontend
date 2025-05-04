import { Box, Heading, Text, Link } from '@chakra-ui/react';

export default function DashboardStats({ title, count, tasks }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading size="md" mb={4}>
        {title} ({count})
      </Heading>
      <Box>
        {tasks.slice(0, 5).map(task => (
          <Text key={task.id} py={1}>
            <Link href={`/tasks/${task.id}`} color="blue.500">
              {task.title}
            </Link>
            <Text as="span" fontSize="sm" color="gray.500" ml={2}>
              {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          </Text>
        ))}
        {count > 5 && (
          <Text mt={2} color="blue.500">
            <Link href="/tasks">View all →</Link>
          </Text>
        )}
      </Box>
    </Box>
  );
}