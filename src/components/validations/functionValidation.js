// import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const useFunctionValidationSchema = () => {
  // const { t } = useTranslation();

  const functionValidationSchema = Yup.object({
    name: Yup.string().required('Tên không được để trống'),
    description: Yup.string()
  });

  return functionValidationSchema;
};

export default useFunctionValidationSchema;