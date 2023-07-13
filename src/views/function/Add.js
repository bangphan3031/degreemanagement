import React from 'react';
import { Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { createFunction } from 'services/functionService';
import { setOpenPopup, showAlert, setReloadData } from 'store/actions';
import { useDispatch } from 'react-redux';
import { useFunctionValidationSchema } from 'components/validations/functionValidation';
import AnimateButton from 'components/extended/AnimateButton';
import InputForm from 'components/form/InputForm';
//import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// import { rolesSelector } from 'store/selectors';

const AddFunction = () => {
  const dispatch = useDispatch();
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} my={2}>
        <InputForm formik={formik} name='name' label='Tên chức năng' isFirst />
        <InputForm formik={formik} name='description' label='Mô tả' />
        <Grid item xs={12} container spacing={3} justifyContent="flex-end" my={2}>
          <Grid item>
            <AnimateButton>
              <Button type="submit" variant="contained" color="primary">
                Lưu
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button type="button" variant="contained" color="primary" onClick={formik.resetForm}>
                Làm mới
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddFunction;
