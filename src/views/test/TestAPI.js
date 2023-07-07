import React, { useState, useEffect } from 'react';
import { Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Pagination, Grid } from '@mui/material';
import { IconEdit, IconTrash, IconDetails, IconPlus, IconUserPlus, IconUserCheck, IconSearch } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

// project imports
import MainCard from 'components/cards/MainCard';
import { getUsers } from 'services/userService';
import Popup from 'components/controls/popup';
import Add from './TestAdd';
import Edit from './TestEdit';
import Delete from './TestDelete';
import AnimateButton from 'components/extended/AnimateButton';
import { setUsers, setOpenPopup, selectedUser } from '../../store/actions';
import { openPopupSelector, usersSelector } from 'store/selectors';

const TestAPI = () => {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState('');
  const [form, setForm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const userList = useSelector(usersSelector);
  const openPopup = useSelector(openPopupSelector);

  useEffect(() => {
    getUsers().then((data) => {
      dispatch(setUsers(data));
    });
  }, [dispatch]);

  useEffect(() => {
    setUserData(userList);
    setTotalPages(Math.ceil(userList.length / 6));
  }, [userList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAddUser = () => {
    setTitle(<><IconUserPlus /> Add user </>);
    setForm('add')
    dispatch(setOpenPopup(true))
  };

  const handleEditUser = (user) => {
    dispatch(selectedUser(user))
    setTitle(<><IconUserCheck /> Edit user </>);
    setForm('edit')
    dispatch(setOpenPopup(true))
  };

  const handleDeleteUser = (user) => {
    dispatch(selectedUser(user))
    setTitle(<> Delete user </>);
    setForm('delete')
    dispatch(setOpenPopup(true))
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const rowsPerPage = 6;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = page * rowsPerPage;

  return (
    <>
      <MainCard
        title="TestAPI"
        secondary={
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9}>
              <TextField
                id="search-input"
                label="Search"
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={handleSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <IconSearch color='#2196F3'/>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <AnimateButton>
                <Tooltip title="Add" placement="bottom">
                  <Button color="info" variant="outlined" size="medium" onClick={handleAddUser}>
                    <IconPlus /> Add
                  </Button>
                </Tooltip>
              </AnimateButton>
            </Grid>
          </Grid>
        }
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {userData ? (
              <TableBody>
                {userData.slice(startIndex, endIndex).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Tooltip title="Detail" placement="bottom">
                        <Button color="info" variant="outlined" size="small">
                          <IconDetails />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Edit" placement="bottom">
                        <Button color="success" variant="outlined" size="small"  onClick={() => handleEditUser(user)}>
                          <IconEdit />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="bottom">
                        <Button color="error" variant="outlined" size="small" onClick={() => handleDeleteUser(user)}>
                          <IconTrash />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3}>Loading...</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Pagination count={totalPages} page={page} onChange={handleChangePage} />
      </MainCard>
      <Popup title={title} openPopup={openPopup}>
        {form === 'add' ? <Add /> : form === 'edit' ? <Edit /> : <Delete />}
      </Popup>
    </>
  );
};

export default TestAPI;
