import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const useActionValidationSchema = () => {
  const { t } = useTranslation();

  const functionValidationSchema = Yup.object({
    action: Yup.string().required(t('validattion.action.name'))
  });

  return functionValidationSchema;
};

export default useActionValidationSchema;
