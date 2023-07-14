import React from 'react';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { createRole } from 'services/roleService';
import { setOpenPopup, showAlert, setReloadData } from 'store/actions';
import { useDispatch } from 'react-redux';
import { useRoleValidationSchema } from 'components/validations/roleValidation';
import { useTranslation } from 'react-i18next';
import InputForm from 'components/form/InputForm';
import SaveButton from 'components/button/SaveButton';
import ExitButton from 'components/button/ExitButton';

const AddRole = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const roleValidationSchema = useRoleValidationSchema();

  const formik = useFormik({
    initialValues: {
        name: '',
    },
    validationSchema: roleValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setOpenPopup(false));
        const addedRoles = await createRole(values);
        if(addedRoles.isSuccess == false){
          dispatch(showAlert(new Date().getTime().toString(), 'error', addedRoles.message.toString()));
        } else {
          dispatch(setReloadData(true));
          dispatch(showAlert(new Date().getTime().toString(), 'success', addedRoles.message.toString()));
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
        <InputForm formik={formik} name='name' label={t('role.input.label.name')} type='text' isFirst />
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

export default AddRole;
