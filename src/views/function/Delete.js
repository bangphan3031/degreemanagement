import React from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IconAlertCircle } from '@tabler/icons';
import { deleteFunction } from 'services/functionService';
import { setOpenPopup, setReloadData, showAlert } from 'store/actions';
import { selectedFunctionSelector } from 'store/selectors';
import MuiTypography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import YesButton from 'components/button/YesButton';
import NoButton from 'components/button/NoButton';

const DeleteFunction = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedFunction = useSelector(selectedFunctionSelector);

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
          <YesButton handleClick={handleDeleteClick}/>
        </Grid>
        <Grid item>
          <NoButton />
        </Grid>
      </Grid>
    </div>
  );
};

export default DeleteFunction;
