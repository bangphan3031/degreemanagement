import { DataGrid } from '@mui/x-data-grid';
import { IconEdit, IconPlus, IconTrash, IconUserCheck, IconUserPlus } from '@tabler/icons';
import CustomButton from 'components/button/CustomButton';
import MainCard from 'components/cards/MainCard';
import Popup from 'components/controls/popup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenPopup, setReloadData, selectedRole } from 'store/actions';
import { openPopupSelector, reloadDataSelector } from 'store/selectors';
import Add from '../role/AddRole';
import Edit from '../role/EditRole';
import Delete from '../role/DeleteRole';
import { getRoles } from 'services/roleService';
import { Button, Grid, Tooltip } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';

const TestAPI = () => {
  const dispatch = useDispatch();
  const openPopup = useSelector(openPopupSelector);
  const [title, setTitle] = useState('');
  const [form, setForm] = useState('');
  const reloadData = useSelector(reloadDataSelector);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    startIndex: 0,
    pageSize: 5
  });
  
  console.log('reloadData' + reloadData)

  const columns = [
    {
      field: 'rowIndex',
      headerName: 'STT',
      width: 70
    },
    {
      field: 'name',
      headerName: 'Tên nhóm quyền',
      width: 300
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

  useEffect(() => {
    const fetchData = async () => {
      console.log('ON');
      setPageState((old) => ({ ...old, isLoading: true }));
      const params = new URLSearchParams();
      // if (search) {
      //   params.append('Search', search);
      // }
      params.append('StartIndex', pageState.startIndex);
      params.append('PageSize', pageState.pageSize);
      const response = await getRoles(params);
      const data = await response.data;
        console.log(data)
      // Assign a unique 'id' property to each row based on 'roleId'
      const dataWithIds = data.map((row, index) => ({
        id: index + 1,
        ...row
      }));

      dispatch(setReloadData(false));

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: dataWithIds,
        total: dataWithIds[0]?.totalRow || 0
      }));
    };
    fetchData();
  }, [pageState.startIndex, pageState.pageSize, reloadData]);

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

  return (
    <>
      <MainCard
        title="Nhóm quyền"
        secondary={<CustomButton handleClick={handleAddRole} icon={IconPlus} label={'Thêm'} title={'Thêm mới'}/>}
      >
        <DataGrid
          autoHeight
          columns={columns}
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          pagination
          page={pageState.startIndex}
          pageSize={pageState.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => {
            console.log(newPage)
            setPageState((old) => ({ ...old, startIndex: newPage }));
          }}
          onPageSizeChange={(newPageSize) => {
            console.log(newPageSize)
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }}
          disableSelectionOnClick={true}
        />
      </MainCard>
      <Popup title={title} openPopup={openPopup}>
        {form === 'add' ? <Add /> : form === 'edit' ? <Edit /> : <Delete />}
      </Popup>
    </>
  );
};

export default TestAPI;
