import { React } from 'react';
import { Button, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useFunctionValidationSchema } from '../../components/validations/functionValidation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { editFunction } from 'services/functionService';
import { showAlert, setOpenPopup, setReloadData } from 'store/actions';
import { selectedFunctionSelector } from 'store/selectors';
import AnimateButton from 'components/extended/AnimateButton';
import InputForm from 'components/form/InputForm';
//import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const EditFunction = () => {
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
  // const [selectedActions, setSelectedActions] = useState([]);

  // const updateActionValue = (selectedValues) => {
  //   setSelectedActions(selectedValues);
  //   formik.setFieldValue('action', selectedValues.join(','));
  // };

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

export default EditFunction;
