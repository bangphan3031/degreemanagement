import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const useRoleValidationSchema = () => {
  const { t } = useTranslation();

  const roleValidationSchema = Yup.object({
    name: Yup.string().required(t('validattion.role.name')),
  });

  return roleValidationSchema;
};

export default useRoleValidationSchema;
