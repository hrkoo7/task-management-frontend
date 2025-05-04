import { Skeleton, Stack, Box, Grid } from '@chakra-ui/react';

export function DashboardSkeleton() {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} p={4}>
      {[1, 2, 3].map((i) => (
        <Box key={i} borderWidth="1px" borderRadius="lg" p={4}>
          <Skeleton height="30px" width="60%" mb={4} />
          <Stack spacing={3}>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" width="40%" />
          </Stack>
        </Box>
      ))}
    </Grid>
  );
}

export function TaskListSkeleton() {
  return (
    <Stack spacing={4}>
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
    </Stack>
  );
}

export function TaskFormSkeleton() {
  return (
    <Stack spacing={4}>
      <Skeleton height="40px" />
      <Skeleton height="100px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" width="30%" />
    </Stack>
  );
}