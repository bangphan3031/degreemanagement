import React from 'react';
import { FormControl, InputLabel, Input, Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { roleValidationSchema } from '../../components/validations/roleValidation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { editRole } from 'services/roleService';
import { showAlert, setOpenPopup, updatedRole } from 'store/actions';
import { selectedRoleSelector } from 'store/selectors';
import AnimateButton from 'components/extended/AnimateButton';

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
        const modifiedData = { ...roleUpdated.data, rowIndex: selectedRole.rowIndex };
        dispatch(updatedRole(modifiedData));
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

export default EditRole;
