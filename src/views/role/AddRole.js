import React from 'react';
import { FormControl, InputLabel, Input, Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { createRole } from 'services/roleService';
import { addRole, setOpenPopup, showAlert } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { roleValidationSchema } from 'components/validations/roleValidation';
import AnimateButton from 'components/extended/AnimateButton';
import { rolesSelector } from 'store/selectors';

const AddRole = () => {
  const dispatch = useDispatch();
  const roles = useSelector(rolesSelector);

  const formik = useFormik({
    initialValues: {
        name: '',
    },
    validationSchema: roleValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setOpenPopup(false));
        const addedRoles = await createRole(values);
        const modifiedData = { ...addedRoles.data, rowIndex: roles.length + 1 };
        dispatch(addRole(modifiedData));
        dispatch(showAlert(new Date().getTime().toString(), 'success', addedRoles.message.toString()));
      } catch (error) {
        console.error(error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="name-input">Tên</InputLabel>
            <Input
              id="name-input"
              name="name"
              fullWidth={true}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            /> {formik.touched.name && formik.errors.name && (
              <div style={{ color: 'red' }}>{formik.errors.name}</div>
            )}
          </FormControl>
          <Grid container spacing={1} direction="row" my={2}>
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
      </Grid>
    </form>
  );
};

export default AddRole;
