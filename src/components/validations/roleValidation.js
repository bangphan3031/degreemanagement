import * as Yup from 'yup';

export const roleValidationSchema = Yup.object({
  name: Yup.string().required('Tên không được để trống'),
});
