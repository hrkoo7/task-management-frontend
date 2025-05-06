import { Box, Heading, Text, Link, Stack, Grid, Badge } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function DashboardStats({ title, count, tasks }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO':        return 'gray';
      case 'IN_PROGRESS': return 'blue';
      case 'DONE':        return 'green';
      default:            return 'gray';
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      p={6}
      bg="white"
      _hover={{ boxShadow: 'lg' }}
      transition="box-shadow 0.2s"
    >
      <Stack spacing={4}>
        <Heading size="md" display="flex" justifyContent="space-between">
          {title}
          <Badge
            colorScheme={count === 0 ? 'gray' : count < 5 ? 'yellow' : 'green'}
            fontSize="0.9em"
            px={2}
            py={1}
          >
            {count}
          </Badge>
        </Heading>

        <Stack spacing={2}>
          {tasks.slice(0, 5).map((task) => (
            <Grid
              key={task.id}
              templateColumns="3fr 1fr 1.5fr"
              alignItems="center"
              gap={3}
            >
              <Link
                href={`/tasks/${task.id}`}
                color="blue.600"
                fontWeight="medium"
                _hover={{ textDecoration: 'underline' }}
              >
                {task.title}
              </Link>

              <Badge
                colorScheme={getStatusColor(task.status)}
                textTransform="capitalize"
                justifySelf="start"
              >
                {task.status.replace('_', ' ')}
              </Badge>

              <Text fontSize="sm" color="gray.500" justifySelf="end">
                {new Date(task.dueDate).toLocaleDateString()}
              </Text>
            </Grid>
          ))}

          {count > 5 && (
            <Link
              href="/tasks"
              display="flex"
              alignItems="center"
              fontWeight="medium"
              color="blue.500"
              mt={2}
            >
              View all
              <ChevronRightIcon ml={1} />
            </Link>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
