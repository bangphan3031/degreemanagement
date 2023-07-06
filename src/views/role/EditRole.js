import React from 'react';
import { FormControl, InputLabel, Input, Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { roleValidationSchema } from '../../components/validations/roleValidation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { editRole } from 'services/roleService';
import { showAlert, setOpenPopup, updatedRole } from 'store/actions';
import { selectedRoleSelector } from 'store/selectors';

const EditRole = () => {

  const dispatch = useDispatch();
  const selectedRole = useSelector(selectedRoleSelector);

  const formik = useFormik({
    initialValues: {
        name: ''
    },
    validationSchema: roleValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setOpenPopup(false));
        const roleUpdated = await editRole({
          ...values,
          roleId: selectedRole.roleId
        });
        console.log('Role updated:', roleUpdated);
        dispatch(updatedRole(roleUpdated.data));
        dispatch(showAlert(new Date().getTime().toString(), 'success', roleUpdated.message.toString()));
      } catch (error) {
        console.error('Error updating role:', error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
    }
  });

  useEffect(() => {
    if (selectedRole) {
      formik.setValues({
        name: selectedRole.name || ''
      });
    }
  }, [selectedRole]);

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

export default EditRole;
