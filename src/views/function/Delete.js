import React from 'react';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IconAlertCircle } from '@tabler/icons';
import { deleteFunction } from 'services/functionService';
import { setOpenPopup, setReloadData, showAlert } from 'store/actions';
import { selectedFunctionSelector } from 'store/selectors';
import AnimateButton from 'components/extended/AnimateButton';
import MuiTypography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const DeleteFunction = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedFunction = useSelector(selectedFunctionSelector);

  const handleCancelClick = () => {
    dispatch(setOpenPopup(false));
  };

  const handleDeleteClick = async () => {
    try {
      dispatch(setOpenPopup(false));
      const functionDeleted = await deleteFunction(selectedFunction.functionId);
      if (functionDeleted.isSuccess == false) {
        dispatch(showAlert(new Date().getTime().toString(), 'error', functionDeleted.message.toString()));
      } else {
        dispatch(setReloadData(true));
        dispatch(showAlert(new Date().getTime().toString(), 'success', functionDeleted.message.toString()));
      }
    } catch (error) {
      console.error('Error updating Function:', error);
      dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <IconAlertCircle size={100} color="red" />
      <MuiTypography variant="h4" gutterBottom m={2}>
        {t('form.delete.warning1')}
      </MuiTypography>
      <MuiTypography variant="body1" gutterBottom>
        {t('form.delete.warning2')}
      </MuiTypography>
      <Grid container spacing={1} direction="row" justifyContent="center" my={2}>
        <Grid item>
          <AnimateButton>
            <Button onClick={handleCancelClick} variant="outlined" sx={{ marginRight: '20px' }}>
              {t('button.cancel')}
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item>
          <AnimateButton>
            <Button onClick={handleDeleteClick} variant="contained" color="error">
              {t('button.cancel')}
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeleteFunction;
