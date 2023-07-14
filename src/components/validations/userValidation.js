import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const useUserValidationSchema = () => {
  const { t } = useTranslation();

  const userValidationSchema = Yup.object({
    fullName: Yup.string().max(255).required(t('validattion.user.fullname')),
    userName: Yup.string().max(255).required(t('validattion.user.username')),
    password: Yup.string().max(255).required(t('validattion.user.password'))
  });

  return userValidationSchema;
};

export default useUserValidationSchema;
