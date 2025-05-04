import { Grid, Heading, Spinner } from '@chakra-ui/react';
import DashboardStats from '../components/DashboardStats';
import { DashboardSkeleton } from '../components/LoadingSkeletons';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api'; // Adjust the import based on your project structure
import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get('/api/tasks/dashboard');
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
      setLoading(false);
    };

    if (user) fetchDashboardData();
  }, [user]);

  if (loading) return <DashboardSkeleton />;

  return (
    <ProtectedRoute>
      <Heading mb={8} textAlign="center">Task Dashboard</Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} p={4}>
        <DashboardStats
          title="Assigned Tasks"
          count={dashboardData.assigned.count}
          tasks={dashboardData.assigned.tasks}
        />
        <DashboardStats
          title="Created Tasks"
          count={dashboardData.created.count}
          tasks={dashboardData.created.tasks}
        />
        <DashboardStats
          title="Overdue Tasks"
          count={dashboardData.overdue.count}
          tasks={dashboardData.overdue.tasks}
        />
      </Grid>
    </ProtectedRoute>
  );
}