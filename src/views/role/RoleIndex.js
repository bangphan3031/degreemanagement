import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { Grid } from '@mui/material';
import { IconSearch, IconEdit, IconTrash, IconUserCheck, IconUserPlus, IconPlus } from '@tabler/icons';
import { DataGrid, GridPagination } from '@mui/x-data-grid';
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
import CustomButton from 'components/button/CustomButton';

const RoleIndex = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const roles = useSelector(rolesSelector);
  const openPopup = useSelector(openPopupSelector);
  const showAlert = useSelector(showAlertSelector);
  const [title, setTitle] = useState('');
  const [form, setForm] = useState('');

  useEffect(() => {
    getRoles().then((data) => {
      dispatch(setRoles(data));
    });
  }, [dispatch]);

  const handleAddRole = () => {
    setTitle(<><IconUserPlus /> Thêm nhóm quyền </>);
    setForm('add')
    dispatch(setOpenPopup(true));
  };

  const handleEditRole = (role) => {
    setTitle(<><IconUserCheck /> Chỉnh sửa nhóm quyền </>);
    setForm('edit')
    dispatch(selectedRole(role));
    dispatch(setOpenPopup(true));
  };

  const handleDeleteRole = (role) => {
    setTitle(<> Xóa nhóm quyền </>);
    setForm('delete')
    dispatch(selectedRole(role));
    dispatch(setOpenPopup(true));
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const columns = [
    { field: 'rowIndex', headerName: 'STT', width: 80 },
    {
      field: 'name',
      headerName: 'Tên nhóm quyền',
      width: 820
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Grid container spacing={1} direction="row">
            <Grid item>
              <AnimateButton>
                <Tooltip title="Chỉnh sửa" placement="bottom">
                  <Button
                    color="success"
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditRole(params.row)}
                  >
                    <IconEdit />
                  </Button>
                </Tooltip>
              </AnimateButton>
            </Grid>
            <Grid item>
              <AnimateButton>
                <Tooltip title="Xóa" placement="bottom">
                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    onClick={() => handleDeleteRole(params.row)}
                  >
                    <IconTrash />
                  </Button>
                </Tooltip>
              </AnimateButton>
            </Grid>
          </Grid>
        </>
      ),      
    },
  ];

  const rows = roles.map((role) => ({
    id: role.roleId,
    rowIndex: role.rowIndex,
    name: role.name,
  }));

  console.log(rows)

  const CustomPagination = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 50 }}>
        <GridPagination />
      </Box>
    );
  };

  return (
    <>
      <MainCard
        title="Nhóm quyền"
        secondary={<CustomButton handleClick={handleAddRole} icon={IconPlus} label={'Thêm'} title={'Thêm mới'}/>}
      >
        <Grid item xs={12} sx={{marginBottom: '10px'}}>
          <TextField
            id="search-input"
            label="Tìm kiếm"
            variant="outlined"
            size="small"
            fullWidth={true}
            value={searchValue}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <IconSearch color="#2196F3" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Box sx={{ height: 422, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 6,
                },
              },
            }}
            components={{
              Pagination: CustomPagination,
            }}
            pageSizeOptions={[6, 10]}
            disableRowSelectionOnClick
          />
        </Box>
      </MainCard>
      <Popup title={title} openPopup={openPopup}>
        {form === 'add' ? <Add /> : form === 'edit' ? <Edit /> : <Delete />}
      </Popup>
      {showAlert && <Alert />}
    </>
  );
};

export default RoleIndex;
