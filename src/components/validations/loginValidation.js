import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const useLoginValidationSchema = () => {
  const { t } = useTranslation();

  const loginValidationSchema = Yup.object({
    username: Yup.string().max(255).required(t('validattion.user.username')),
    password: Yup.string().max(255).required(t('validattion.user.password'))
  });

  return loginValidationSchema;
};

export default useLoginValidationSchema;
