import React from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IconAlertCircle } from '@tabler/icons';
import { setOpenSubPopup, setReloadData, showAlert } from 'store/actions';
import MuiTypography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import YesButton from 'components/button/YesButton';
import NoButton from 'components/button/NoButton';
import { selectedActionSelector } from 'store/selectors';
import { deleteAction } from 'services/actionService';

const DeleteAction = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedAction = useSelector(selectedActionSelector);

  const handleDeleteClick = async () => {
    try {
      dispatch(setOpenSubPopup(false));
      const actionDeleted = await deleteAction(selectedAction.functionActionId);
      if (actionDeleted.isSuccess == false) {
        dispatch(showAlert(new Date().getTime().toString(), 'error', actionDeleted.message.toString()));
      } else {
        dispatch(setReloadData(true));
        dispatch(showAlert(new Date().getTime().toString(), 'success', actionDeleted.message.toString()));
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
          <YesButton handleClick={handleDeleteClick} />
        </Grid>
        <Grid item>
          <NoButton type="subpopup" />
        </Grid>
      </Grid>
    </div>
  );
};

export default DeleteAction;
