import React from 'react';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useRoleValidationSchema } from '../../components/validations/roleValidation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { editRole } from 'services/roleService';
import { showAlert, setOpenPopup, setReloadData } from 'store/actions';
import { selectedRoleSelector } from 'store/selectors';
import { useTranslation } from 'react-i18next';
import InputForm from 'components/form/InputForm';
import SaveButton from 'components/button/SaveButton';
import ResetButton from 'components/button/ExitButton';

const EditRole = () => {

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedRole = useSelector(selectedRoleSelector);
  const roleValidationSchema = useRoleValidationSchema();

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
        if(roleUpdated.isSuccess == false){
          dispatch(showAlert(new Date().getTime().toString(), 'error', roleUpdated.message.toString()));
        } else {
          dispatch(setReloadData(true));
          dispatch(showAlert(new Date().getTime().toString(), 'success', roleUpdated.message.toString()));
        }
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

  const handleCancelClick = () => {
    dispatch(setOpenPopup(false));
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} my={2}>
        <InputForm formik={formik} name='name' label={t('role.input.label.name')} type="text" isFirst />
        <Grid item xs={12} container spacing={2} justifyContent="flex-end" mt={1}>
          <Grid item>
            <SaveButton />
          </Grid>
          <Grid item>
            <ResetButton handleClick={handleCancelClick}/>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditRole;
