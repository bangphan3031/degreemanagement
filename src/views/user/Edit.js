import React from 'react';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useUserValidationSchema }  from '../../components/validations/userValidation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { showAlert } from 'store/actions'; //setOpenPopup, setReloadData
import { selectedUserSelector } from 'store/selectors';
import InputForm from 'components/form/InputForm';
import FormImage from 'components/form/ImageForm';
import { useTranslation } from 'react-i18next';
import SaveButton from 'components/button/SaveButton';
import ExitButton from 'components/button/ExitButton';

const EditUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userValidationSchema = useUserValidationSchema();
  const selectedUser = useSelector(selectedUserSelector);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      email: ''
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        // dispatch(setOpenPopup(false));
        // const roleUpdated = await editRole({
        //   ...values,
        //   roleId: selectedRole.roleId
        // });
        // if (roleUpdated.isSuccess == false) {
        //   dispatch(showAlert(new Date().getTime().toString(), 'error', roleUpdated.message.toString()));
        // } else {
        //   dispatch(setReloadData(true));
        //   dispatch(showAlert(new Date().getTime().toString(), 'success', roleUpdated.message.toString()));
        // }
      } catch (error) {
        console.error('Error updating role:', error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
    }
  });

  useEffect(() => {
    if (selectedUser) {
      formik.setValues({
        fullName: selectedUser.fullName || '',
        userName: selectedUser.userName || '',
        password: selectedUser.password || '',
        email: selectedUser.email || ''
      });
    }
  }, [selectedUser]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} my={1}>
        <Grid item xs={7}>
          <InputForm formik={formik} name="userName" label={t('user.input.label.username')} type="text" isFirst isDisabled />
          <InputForm formik={formik} name="fullName" label={t('user.input.label.fullname')} type="text" />
          <InputForm formik={formik} name="email" label={t('user.input.label.email')} type="mail" />
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FormImage />
        </Grid>
        <Grid item xs={12} container spacing={2} justifyContent="flex-end" mt={1}>
          <Grid item>
            <SaveButton />
          </Grid>
          <Grid item>
            <ExitButton />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditUser;
