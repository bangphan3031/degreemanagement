// import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const roleValidationSchema = Yup.object({
  name: Yup.string().required('Tên nhóm quyền không được để trống'),
});
