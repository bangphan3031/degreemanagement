import React from 'react';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { createUser } from 'services/userService';
import { setOpenPopup, showAlert, setReloadData } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useUserValidationSchema } from 'components/validations/userValidation';
import { handleResponseStatus } from 'utils/handleResponseStatus';
import { useNavigate } from 'react-router';
import InputForm from 'components/form/InputForm';
import ImageForm from 'components/form/ImageForm';
import ExitButton from 'components/button/ExitButton';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SaveButton from 'components/button/SaveButton';
import { openPopupSelector, userLoginSelector } from 'store/selectors';
import { convertJsonToFormData } from 'utils/convertJsonToFormData';

const AddUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userValidationSchema = useUserValidationSchema(false);
  const openPopup = useSelector(openPopupSelector);
  const userLogin = useSelector(userLoginSelector);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      password: '',
      email: '',
      avatar: '',
      fileImage: '',
      createdBy: userLogin.username
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        const formData = await convertJsonToFormData(values);
        const addedUser = await createUser(formData);
        const check = handleResponseStatus(addedUser, navigate);
        if (!check) {
          dispatch(showAlert(new Date().getTime().toString(), 'error', addedUser.message.toString()));
        } else {
          if (addedUser.isSuccess == false) {
            dispatch(showAlert(new Date().getTime().toString(), 'error', addedUser.message.toString()));
          } else {
            dispatch(showAlert(new Date().getTime().toString(), 'success', addedUser.message.toString()));
            dispatch(setOpenPopup(false));
            dispatch(setReloadData(true));
          }
        }
      } catch (error) {
        console.error('error' + error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
    }
  });

  useEffect(() => {
    if (openPopup) {
      formik.resetForm();
    }
  }, [openPopup]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} my={1}>
        <Grid item xs={7}>
          <InputForm formik={formik} name="fullName" label={t('user.input.label.fullname')} type="text" isFirst />
          <InputForm formik={formik} name="userName" label={t('user.input.label.username')} type="text" />
          <InputForm formik={formik} name="password" label={t('user.input.label.password')} type="password" />
          <InputForm formik={formik} name="email" label={t('user.input.label.email')} type="mail" />
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ImageForm formik={formik} name="avatar" nameFile="fileImage" isImagePreview={openPopup} />
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

export default AddUser;
