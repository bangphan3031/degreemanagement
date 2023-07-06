import React, { useState, useEffect } from 'react';
import { Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Pagination, Grid } from '@mui/material';
import { IconEdit, IconTrash, IconPlus, IconUserPlus, IconUserCheck, IconSearch } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

// project imports
import MainCard from 'components/cards/MainCard';
import { getRoles } from 'services/roleService';
import Popup from 'components/controls/popup';
import Add from '../role/AddRole';
import Edit from '../role/EditRole';
import Delete from '../role/DeleteRole';
import AnimateButton from 'components/extended/AnimateButton';
import { setOpenPopup, selectedRole, setRoles } from '../../store/actions';
import { openPopupSelector, rolesSelector, showAlertSelector } from 'store/selectors';
import Alert from 'components/controls/alert';
import SubCard from 'components/cards/SubCard';

const RoleIndex = () => {
  const [roleData, setRoleData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState('');
  const [form, setForm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const roles = useSelector(rolesSelector);
  const openPopup = useSelector(openPopupSelector);
  const showAlert = useSelector(showAlertSelector);

  useEffect(() => {
    getRoles().then((data) => {
      dispatch(setRoles(data));
    });
  }, [dispatch]);

  useEffect(() => {
    setRoleData(roles);
    setTotalPages(Math.ceil(roles.length / 6));
  }, [roles]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAddRole = () => {
    setTitle(<><IconUserPlus /> Thêm nhóm quyền </>);
    setForm('add')
    dispatch(setOpenPopup(true))
  };

  const handleEditRole = (role) => {
    dispatch(selectedRole(role))
    setTitle(<><IconUserCheck /> Chỉnh sửa nhóm quyền </>);
    setForm('edit')
    dispatch(setOpenPopup(true))
  };

  const handleDeleteRole = (role) => {
    dispatch(selectedRole(role))
    setTitle(<> Xóa nhóm quyền </>);
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
        title="Nhóm quyền"
        secondary={
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <AnimateButton>
                <Tooltip title="Thêm mới" placement="bottom">
                  <Button color="info" variant="outlined" size="medium" onClick={handleAddRole}>
                    <IconPlus /> Thêm
                  </Button>
                </Tooltip>
              </AnimateButton>
            </Grid>
          </Grid>
        }
      >
        <SubCard>
          <Grid item xs={9}>
            <TextField
              id="search-input"
              label="Tìm kiếm"
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {roleData ? (
                <TableBody>
                  {roleData.slice(startIndex, endIndex).map((role) => (
                    <TableRow key={role.roleId}>
                      <TableCell>{role.roleId}</TableCell>
                      <TableCell>{role.name}</TableCell>
                      <TableCell>
                        <Tooltip title="Chỉnh sửa" placement="bottom">
                          <Button color="success" variant="outlined" size="small"  onClick={() => handleEditRole(role)}>
                            <IconEdit />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Xóa" placement="bottom">
                          <Button color="error" variant="outlined" size="small" onClick={() => handleDeleteRole(role)}>
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
        </SubCard>
        <Pagination count={totalPages} page={page} onChange={handleChangePage} />
      </MainCard>
      <Popup title={title} openPopup={openPopup}>
        {form === 'add' ? <Add /> : form === 'edit' ? <Edit /> : <Delete />}
      </Popup>
      {showAlert && <Alert />}
    </>
  );
};

export default RoleIndex;
