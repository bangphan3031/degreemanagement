import * as Yup from 'yup';

export const userValidationSchema = Yup.object({
  name: Yup.string().max(255).required('Name is required'),
  email: Yup.string().max(255).required('User name is required'),
  phone: Yup.string().required('Phone is required'),
  password: Yup.string().max(255).required('Password is required')
});