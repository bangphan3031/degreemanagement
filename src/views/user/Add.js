import React from 'react';
import { Grid, Button } from '@mui/material'; //FormControl, InputLabel, Input,
import { useFormik } from 'formik';
import { createUser } from 'services/userService';
import { setOpenPopup, showAlert, setReloadData } from 'store/actions';
import { useDispatch } from 'react-redux';
import AnimateButton from 'components/extended/AnimateButton';
import { useUserValidationSchema } from 'components/validations/userValidation';
import { handleResponseStatus } from 'utils/handleResponseStatus';
import { useNavigate } from 'react-router';
import InputForm from 'components/form/InputForm';
import FormImage from 'components/form/ImageForm';
import MultiSelectForm from 'components/form/MultiSelectForm';

import { getRoles } from 'services/roleService';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userValidationSchema = useUserValidationSchema();
  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRoles();

      const rolesData = response.data.map((role) => ({ id: role.roleId, name: role.name }));
      setRoles(rolesData);
    };
    fetchData();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      password: '',
      email: '',
      roles: []
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      try {
        const roleIds = values.roles.map((role) => role.id);
        values = {
          ...values,
          roleIds: `${roleIds.join(',')}`
        };

        const addedUser = await createUser(values);
        const check = handleResponseStatus(addedUser, navigate);
        if (!check) {
          dispatch(showAlert(new Date().getTime().toString(), 'error', addedUser.message.toString()));
        } else {
          if (addedUser.isSuccess == false) {
            dispatch(showAlert(new Date().getTime().toString(), 'error', addedUser.message.toString()));
          } else {
            dispatch(setOpenPopup(false));
            dispatch(setReloadData(true));
            dispatch(showAlert(new Date().getTime().toString(), 'success', addedUser.message.toString()));
          }
        }
      } catch (error) {
        console.error('error' + error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} my={1}>
        <Grid item xs={7}>
          <InputForm formik={formik} name="fullName" label={t('user.input.label.fullname')} type="text" isFirst />
          <InputForm formik={formik} name="userName" label={t('user.input.label.username')} type="text" />
          <InputForm formik={formik} name="password" label={t('user.input.label.password')} type="password" />
          <InputForm formik={formik} name="email" label={t('user.input.label.email')} type="mail" />
          <MultiSelectForm data={roles} name="roles" label={t('user.input.label.roles')} formik={formik} />
        </Grid>
        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FormImage />
        </Grid>
        <Grid item xs={12} container spacing={3} justifyContent="flex-end" my={2}>
          <Grid item>
            <AnimateButton>
              <Button type="submit" variant="contained" color="primary">
                {t('button.save')}
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button type="button" variant="contained" color="primary" onClick={formik.resetForm}>
                {t('button.reset')}
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddUser;
