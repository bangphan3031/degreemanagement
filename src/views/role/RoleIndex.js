import { DataGrid } from '@mui/x-data-grid';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
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
import { useTranslation } from 'react-i18next';

const TestAPI = () => {
  const dispatch = useDispatch();
  const openPopup = useSelector(openPopupSelector);
  const [title, setTitle] = useState('');
  const [form, setForm] = useState('');
  const reloadData = useSelector(reloadDataSelector);
  const { t } = useTranslation();
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    order: 0,
    orderDir: 'ASC',
    startIndex: 0,
    pageSize: 5
  });

  const columns = [
    {
      field: 'rowIndex',
      headerName: t('serial'),
      width: 70,
      sortable: false,
      filterable: false,
    },
    {
      field: 'name',
      headerName: t('role.field.name'),
      flex: 1
    },
    {
      field: 'actions',
      headerName: t('action'),
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Grid container spacing={1} direction="row">
            <Grid item>
              <AnimateButton>
                <Tooltip title={t('button.title.edit')} placement="bottom">
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
                <Tooltip title={t('button.title.delete')} placement="bottom">
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
      setPageState((old) => ({ ...old, isLoading: true }));
      const params = new URLSearchParams();
      if (pageState.search) {
        params.append('Search', pageState.search);
      }
      if (pageState.order) {
        params.append('Order', pageState.order);
      }
      if (pageState.orderDir) {
        params.append('OrderDir', pageState.orderDir);
      }
      params.append('StartIndex', pageState.startIndex);
      params.append('PageSize', pageState.pageSize);
      const response = await getRoles(params);
      const data = await response.data;
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
  }, [pageState.search, pageState.order, pageState.orderDir ,pageState.startIndex, pageState.pageSize, reloadData]);

  const handleAddRole = () => {
    setTitle(<> {t('role.title.add')} </>);
    setForm('add')
    dispatch(setOpenPopup(true));
  };

  const handleEditRole = (role) => {
    setTitle(<> {t('role.title.edit')} </>);
    setForm('edit')
    dispatch(selectedRole(role));
    dispatch(setOpenPopup(true));
  };

  const handleDeleteRole = (role) => {
    setTitle(<> {t('role.title.delete')} </>);
    setForm('delete')
    dispatch(selectedRole(role));
    dispatch(setOpenPopup(true));
  };

  return (
    <>
      <MainCard
        title={t('role.title')}
        secondary={<CustomButton handleClick={handleAddRole} icon={IconPlus} label={t('button.lable.add')} title={t('button.title.add')}/>}
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
            // console.log(newPage)
            setPageState((old) => ({ ...old, startIndex: newPage }));
          }}
          onPageSizeChange={(newPageSize) => {
            // console.log(newPageSize)
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }}
          onSortModelChange={(newSortModel) => {
            const field = newSortModel[0]?.field;
            const sort = newSortModel[0]?.sort;
            // console.log('field: '+field, 'sort: '+sort)
            setPageState((old) => ({ ...old, order: field, orderDir: sort }))
          }}
          onFilterModelChange={(newSearchModel) => {
            const value = newSearchModel.items[0]?.value;
            // console.log(value)
            setPageState((old) => ({ ...old, search: value }))
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
