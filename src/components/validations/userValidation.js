import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const useUserValidationSchema = (isUpdate = false) => {
  const { t } = useTranslation();

  let userValidationSchema = Yup.object({
    fullName: Yup.string().max(255).required(t('validattion.user.fullname')),
    userName: Yup.string().max(255).required(t('validattion.user.name'))
  });

  if (!isUpdate) {
    userValidationSchema = userValidationSchema.shape({
      password: Yup.string().max(255).required(t('validattion.user.password'))
    });
  }

  return userValidationSchema;
};

export default useUserValidationSchema;
