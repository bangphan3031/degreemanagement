import React from 'react';
// import { FormControl, InputLabel, Input, Button, Grid, FormHelperText } from '@mui/material';
import { Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { createRole } from 'services/roleService';
import { setOpenPopup, showAlert, setReloadData } from 'store/actions';
import { useDispatch } from 'react-redux';
import { useRoleValidationSchema } from 'components/validations/roleValidation';
// import AnimateButton from 'components/extended/AnimateButton';
import { useTranslation } from 'react-i18next';
import InputForm from 'components/form/InputForm';
import AnimateButton from 'components/extended/AnimateButton';

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
        {/* <Grid item xs={12}>
          <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel htmlFor="name-input">{t('role.input.lable.name')}</InputLabel>
            <Input
              id="name-input"
              name="name"
              fullWidth={true}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
            /> 
            <FormHelperText error={Boolean(formik.errors.name)}>
              {formik.touched.name && formik.errors.name}
            </FormHelperText>
          </FormControl>
          <Grid container spacing={1} direction="row" my={2}>
            <Grid item>
              <AnimateButton>
                <Button type="button" variant="contained" color="primary" onClick={formik.resetForm}>
                  {t('button.reset')}
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item sx={{ ml: 'auto' }}>
              <AnimateButton>
                <Button type="submit" variant="contained" color="primary">
                  {t('button.save')}
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </Grid> */}
        <InputForm formik={formik} name='name' label={t('role.input.lable.name')} type='text' isFirst />
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

export default AddRole;
