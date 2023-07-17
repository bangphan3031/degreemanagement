import React from 'react';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { createAction } from 'services/actionService';
import { showAlert, setReloadData, setOpenSubPopup } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useActionValidationSchema } from 'components/validations/actionValidation';
import InputForm from 'components/form/InputForm';
import { useTranslation } from 'react-i18next';
import SaveButton from 'components/button/SaveButton';
import ExitButton from 'components/button/ExitButton';
import { openSubPopupSelector, selectedFunctionSelector } from 'store/selectors';
import { useEffect } from 'react';

const AddAction = () => {
  const selectedFunction = useSelector(selectedFunctionSelector);
  console.log(selectedFunction.functionId);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const acionValidationSchema = useActionValidationSchema();
  const openSubPopup = useSelector(openSubPopupSelector);

  const formik = useFormik({
    initialValues: {
      action: '',
      functionId: selectedFunction.functionId
    },
    validationSchema: acionValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setOpenSubPopup(false));
        const addedAction = await createAction({
          ...values
        });
        if (addedAction.isSuccess == false) {
          dispatch(showAlert(new Date().getTime().toString(), 'error', addedAction.message.toString()));
        } else {
          dispatch(setReloadData(true));
          dispatch(showAlert(new Date().getTime().toString(), 'success', addedAction.message.toString()));
        }
      } catch (error) {
        console.error('error' + error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
    }
  });
  useEffect(() => {
    if (openSubPopup) {
      formik.resetForm();
    }
  }, [openSubPopup]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} my={2}>
        <InputForm formik={formik} name="action" label={t('action.input.label.action')} type="text" isFirst />
        <Grid item xs={12} container spacing={2} justifyContent="flex-end" mt={1}>
          <Grid item>
            <SaveButton />
          </Grid>
          <Grid item>
            <ExitButton type="subpopup" />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddAction;
