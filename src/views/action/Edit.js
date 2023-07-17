import { React } from 'react';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { showAlert, setReloadData, setOpenSubPopup } from 'store/actions';
import { openSubPopupSelector, selectedActionSelector, selectedFunctionSelector } from 'store/selectors';
import InputForm from 'components/form/InputForm';
import { useTranslation } from 'react-i18next';
import SaveButton from 'components/button/SaveButton';
import ExitButton from 'components/button/ExitButton';
import useActionValidationSchema from 'components/validations/actionValidation';
import { editAction } from 'services/actionService';

const EditAction = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedFunction = useSelector(selectedFunctionSelector);
  console.log(selectedFunction.functionId);
  const selectedAction = useSelector(selectedActionSelector);
  const actionValidationSchema = useActionValidationSchema();
  const openSubPopup = useSelector(openSubPopupSelector);

  const formik = useFormik({
    initialValues: {
      action: ''
    },
    validationSchema: actionValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setOpenSubPopup(false));
        const actionUpdated = await editAction({
          ...values,
          functionActionId: selectedAction.functionActionId,
          functionId: selectedFunction.functionId
        });
        if (actionUpdated.isSuccess == false) {
          dispatch(showAlert(new Date().getTime().toString(), 'error', actionUpdated.message.toString()));
        } else {
          dispatch(setReloadData(true));
          dispatch(showAlert(new Date().getTime().toString(), 'success', actionUpdated.message.toString()));
        }
      } catch (error) {
        console.error('Error updating function:', error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
    }
  });

  useEffect(() => {
    if (selectedAction) {
      formik.setValues({
        action: selectedAction.action || ''
      });
    }
  }, [selectedAction, openSubPopup]);

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

export default EditAction;
