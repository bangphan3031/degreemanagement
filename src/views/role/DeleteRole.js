import React from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IconAlertCircle } from '@tabler/icons';
import { deleteRole } from 'services/roleService';
import { setOpenPopup, deletedRole, showAlert } from 'store/actions';
import { selectedRoleSelector } from 'store/selectors';

const DeleteRole = () => {

  const dispatch = useDispatch();
  const selectedRole = useSelector(selectedRoleSelector);

  const handleCancelClick = () => {
    dispatch(setOpenPopup(false));
  }

  const handleDeleteClick = async () => {
    try {
        dispatch(setOpenPopup(false));
        const roleDeleted = await deleteRole(selectedRole.roleId);
        console.log('Role deleted:', roleDeleted);
        dispatch(deletedRole(selectedRole.roleId));
        dispatch(showAlert(new Date().getTime().toString(), 'success', roleDeleted.message));
      } catch (error) {
        console.error('Error updating role:', error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
  }

  return (
    <div style={{ textAlign: 'center' }}>
        <IconAlertCircle size={100} color='red'/>
        <p>
            <strong>Bạn chắc chứ?</strong>
        </p>
        <p>Bạn sẽ không thể khôi phục!</p>
        <Button onClick={handleCancelClick} variant="outlined" sx={{marginRight: '20px'}}>
            Hủy
        </Button>
        <Button onClick={handleDeleteClick} variant="contained" color="error">
            Xóa
        </Button>
    </div>
  );
};

export default DeleteRole;
