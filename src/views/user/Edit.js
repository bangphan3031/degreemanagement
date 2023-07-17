import React from 'react';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useUserValidationSchema } from '../../components/validations/userValidation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setOpenPopup, setReloadData, showAlert } from 'store/actions'; //setOpenPopup, setReloadData
import { openPopupSelector, selectedUserSelector } from 'store/selectors';
import InputForm from 'components/form/InputForm';
import ImageForm from 'components/form/ImageForm';
import { useTranslation } from 'react-i18next';
import SaveButton from 'components/button/SaveButton';
import ExitButton from 'components/button/ExitButton';
import { useState } from 'react';
import config from '../../config';
import { updateUser } from 'services/userService';
import { handleResponseStatus } from 'utils/handleResponseStatus';
import { convertJsonToFormData } from 'utils/convertJsonToFormData';
import { useNavigate } from 'react-router';

const EditUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userValidationSchema = useUserValidationSchema(true);
  const selectedUser = useSelector(selectedUserSelector);
  const [urlImage, setUrlImage] = useState('');
  const openPopup = useSelector(openPopupSelector);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      email: '',
      avatar: '',
      fileImage: ''
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        const formData = await convertJsonToFormData(values);
        const updatedUser = await updateUser(formData);
        const check = handleResponseStatus(updatedUser, navigate);
        if (!check) {
          dispatch(showAlert(new Date().getTime().toString(), 'error', updatedUser.message.toString()));
        } else {
          if (updatedUser.isSuccess == false) {
            dispatch(showAlert(new Date().getTime().toString(), 'error', updatedUser.message.toString()));
          } else {
            dispatch(showAlert(new Date().getTime().toString(), 'success', updatedUser.message.toString()));
            dispatch(setOpenPopup(false));
            dispatch(setReloadData(true));
          }
        }
      } catch (error) {
        console.error('Error updating role:', error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
    }
  });

  useEffect(() => {
    if (selectedUser && openPopup) {
      formik.setValues({
        userId: selectedUser.userId || 0,
        fullName: selectedUser.fullName || '',
        userName: selectedUser.userName || '',
        email: selectedUser.email || '',
        avatar: selectedUser.avatar || '',
        fileImage: ''
      });
      setUrlImage(config.urlFile + 'Users/' + selectedUser.avatar);
    }
  }, [selectedUser, openPopup]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} my={1}>
        <Grid item xs={7}>
          <InputForm formik={formik} name="userName" label={t('user.input.label.username')} type="text" isFirst isDisabled />
          <InputForm formik={formik} name="fullName" label={t('user.input.label.fullname')} type="text" />
          <InputForm formik={formik} name="email" label={t('user.input.label.email')} type="mail" />
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ImageForm formik={formik} name="avatar" nameFile="fileImage" isImagePreview={openPopup} urlImage={urlImage} />
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
