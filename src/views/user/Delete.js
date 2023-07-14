import React from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { IconAlertCircle } from '@tabler/icons';
import { deleteRole } from 'services/roleService';
import { setOpenPopup, setReloadData, showAlert } from 'store/actions';
import { selectedRoleSelector } from 'store/selectors';
import { useTranslation } from 'react-i18next';
import YesButton from 'components/button/YesButton';
import NoButton from 'components/button/NoButton';

const DeleteUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedRole = useSelector(selectedRoleSelector);

  const handleDeleteClick = async () => {
    try {
      dispatch(setOpenPopup(false));
      const roleDeleted = await deleteRole(selectedRole.roleId);
      if (roleDeleted.isSuccess == false) {
        dispatch(showAlert(new Date().getTime().toString(), 'error', roleDeleted.message.toString()));
      } else {
        dispatch(setReloadData(true));
        dispatch(showAlert(new Date().getTime().toString(), 'success', roleDeleted.message.toString()));
      }
    } catch (error) {
      console.error('Error updating role:', error);
      dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <IconAlertCircle size={100} color="red" />
      <MuiTypography variant="h4" gutterBottom  m={2}>
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

export default DeleteUser;
