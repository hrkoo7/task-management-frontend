import * as yup from 'yup';

export const authValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

export const taskValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title too long'),
  description: yup
    .string()
    .max(500, 'Description too long'),
  dueDate: yup
    .date()
    .required('Due date is required')
    .min(new Date(), 'Due date must be in the future'),
  priority: yup
    .string()
    .required('Priority is required')
    .oneOf(['LOW', 'MEDIUM', 'HIGH']),
  assignedToId: yup
    .string()
    .nullable()
});