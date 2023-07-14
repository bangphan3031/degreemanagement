import { React } from 'react';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useFunctionValidationSchema } from '../../components/validations/functionValidation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { editFunction } from 'services/functionService';
import { showAlert, setOpenPopup, setReloadData } from 'store/actions';
import { selectedFunctionSelector } from 'store/selectors';
import InputForm from 'components/form/InputForm';
import { useTranslation } from 'react-i18next';
import SaveButton from 'components/button/SaveButton';
import ExitButton from 'components/button/ExitButton';

const EditFunction = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const selectedFunction = useSelector(selectedFunctionSelector);
  const functionValidationSchema = useFunctionValidationSchema();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      action: ''
    },
    validationSchema: functionValidationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setOpenPopup(false));
        const functionUpdated = await editFunction({
          ...values,
          functionId: selectedFunction.functionId
        });
        if (functionUpdated.isSuccess == false) {
          dispatch(showAlert(new Date().getTime().toString(), 'error', functionUpdated.message.toString()));
        } else {
          dispatch(setReloadData(true));
          dispatch(showAlert(new Date().getTime().toString(), 'success', functionUpdated.message.toString()));
        }
      } catch (error) {
        console.error('Error updating function:', error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
    }
  });

  useEffect(() => {
    if (selectedFunction) {
      formik.setValues({
        name: selectedFunction.name || '',
        description: selectedFunction.description || ''
      });
    }
  }, [selectedFunction]);

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

export default EditFunction;
