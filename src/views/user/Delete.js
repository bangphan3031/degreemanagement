import React from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { IconAlertCircle } from '@tabler/icons';
import { setOpenPopup, setReloadData, showAlert } from 'store/actions';
import { selectedUserSelector } from 'store/selectors';
import { useTranslation } from 'react-i18next';
import YesButton from 'components/button/YesButton';
import NoButton from 'components/button/NoButton';
import { deleteUser } from 'services/userService';
import { useNavigate } from 'react-router';
import { handleResponseStatus } from 'utils/handleResponseStatus';

const DeleteUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedUser = useSelector(selectedUserSelector);
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      const userDelete = await deleteUser(selectedUser.userId);
      const check = handleResponseStatus(userDelete, navigate);
      if (!check) {
        dispatch(showAlert(new Date().getTime().toString(), 'error', addedUser.message.toString()));
      } else {
        if (userDelete.isSuccess == false) {
          dispatch(showAlert(new Date().getTime().toString(), 'error', userDelete.message.toString()));
        } else {
          dispatch(setReloadData(true));
          dispatch(setOpenPopup(false));
          dispatch(showAlert(new Date().getTime().toString(), 'success', userDelete.message.toString()));
        }
      }
    } catch (error) {
      console.error('Error updating role:', error);
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
          <NoButton />
        </Grid>
      </Grid>
    </div>
  );
};

export default DeleteUser;
