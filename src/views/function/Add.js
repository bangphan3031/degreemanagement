import React from 'react';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { createFunction } from 'services/functionService';
import { setOpenPopup, showAlert, setReloadData } from 'store/actions';
import { useDispatch } from 'react-redux';
import { useFunctionValidationSchema } from 'components/validations/functionValidation';
import InputForm from 'components/form/InputForm';
import { useTranslation } from 'react-i18next';
import SaveButton from 'components/button/SaveButton';
import ExitButton from 'components/button/ExitButton';

const AddFunction = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const functionValidationSchema = useFunctionValidationSchema()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: functionValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setOpenPopup(false));
        const addedRoles = await createFunction(values);
        if (addedRoles.isSuccess == false) {
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

  const handleCancelClick = () => {
    dispatch(setOpenPopup(false));
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} my={2}>
        <InputForm formik={formik} name='name' label={t('function.input.label.name')} type="text" isFirst />
        <InputForm formik={formik} name='description' label={t('function.input.label.description')} type="text" />
        <Grid item xs={12} container spacing={2} justifyContent="flex-end" mt={1}>
          <Grid item>
            <SaveButton />
          </Grid>
          <Grid item>
            <ExitButton handleClick={handleCancelClick}/>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddFunction;
