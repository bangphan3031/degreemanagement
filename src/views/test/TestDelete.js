import React from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IconAlertCircle } from '@tabler/icons';
import { deleteUser } from 'services/userService';
import { setOpenPopup, deletedUser, showAlert } from 'store/actions';
import { selectedUserSelector } from 'store/selectors';

const DeleteUserForm = () => {

  const dispatch = useDispatch();
  const selectedUser = useSelector(selectedUserSelector);

  const handleCancelClick = () => {
    dispatch(setOpenPopup(false));
  }

  const handleDeleteClick = async () => {
    try {
        dispatch(setOpenPopup(false));
        const userDeleted = await deleteUser(selectedUser.id);
        console.log('User deleted:', userDeleted);
        dispatch(deletedUser(selectedUser.id));
        dispatch(showAlert(new Date().getTime().toString(), 'success', userDeleted.message));
      } catch (error) {
        console.error('Error updating user:', error);
        dispatch(showAlert(new Date().getTime().toString(), 'error', error.toString()));
      }
  }

  return (
    <div style={{ textAlign: 'center' }}>
        <IconAlertCircle size={100} color='red'/>
        <p>
            <strong>Are you sure?</strong>
        </p>
        <p>You wont be able to revert this!</p>
        <Button onClick={handleCancelClick} variant="outlined" sx={{marginRight: '20px'}}>
            Cancel
        </Button>
        <Button onClick={handleDeleteClick} variant="contained" color="error">
            Delete
        </Button>
    </div>
  );
};

export default DeleteUserForm;
