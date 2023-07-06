import React from 'react';
import { FormControl, InputLabel, Input, Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { createRole } from 'services/roleService';
import { addRole, setOpenPopup, showAlert } from 'store/actions';
import { useDispatch } from 'react-redux';
import { roleValidationSchema } from 'components/validations/roleValidation';

const AddRole = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
        name: '',
    },
    validationSchema: roleValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setOpenPopup(false));
        const addedRoles = await createRole(values);
        console.log(addedRoles.data);
        dispatch(addRole(addedRoles.data));
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
        <Grid item xs={7}>
          <FormControl fullWidth>
            <InputLabel htmlFor="name-input">Tên</InputLabel>
            <Input
              id="name-input"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            /> {formik.touched.name && formik.errors.name && (
              <div style={{ color: 'red' }}>{formik.errors.name}</div>
            )}
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{marginRight: '10px', my: 2}}>
            Lưu
          </Button>
          <Button type="button" variant="contained" color="primary" onClick={formik.resetForm}>
            Làm mới
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddRole;
