import { DataGrid } from '@mui/x-data-grid';
import { IconEdit, IconPlus, IconTrash, IconUserCheck, IconUserPlus } from '@tabler/icons';
import CustomButton from 'components/button/CustomButton';
import MainCard from 'components/cards/MainCard';
import Popup from 'components/controls/popup';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenPopup, setReloadData, selectedFunction } from 'store/actions';
import { openPopupSelector, reloadDataSelector } from 'store/selectors';
import { Button, Grid, Tooltip } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import { getFunctions } from 'services/functionService';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { handleResponseStatus } from 'utils/handleResponseStatus';
import { useTranslation } from 'react-i18next';
import useLocalText from 'utils/localText';

const Functions = () => {
  const { t } = useTranslation();
  const localeText = useLocalText()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const openPopup = useSelector(openPopupSelector);
  const [title, setTitle] = useState('');
  const [form, setForm] = useState('');
  const [isAccess, setIsAccess] = useState(true);
  const reloadData = useSelector(reloadDataSelector);
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
      filterable: false
    },
    {
      flex: 1,
      field: 'name',
      headerName: t('function.field.name')
    },
    {
      flex: 1,
      field: 'description',
      headerName: t('function.field.description')
    },
    {
      field: 'actions',
      headerName: t('action'),
      width: 240,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Grid container spacing={1} direction="row">
            <Grid item>
              <AnimateButton>
                <Tooltip title={t('button.title.action')} placement="bottom">
                  <Button color="success" variant="outlined" size="small" onClick={() => handleEditFunction(params.row)}>
                    <IconPlus />
                  </Button>
                </Tooltip>
              </AnimateButton>
            </Grid>
            <Grid item>
              <AnimateButton>
                <Tooltip title={t('button.title.edit')} placement="bottom">
                  <Button color="success" variant="outlined" size="small" onClick={() => handleEditFunction(params.row)}>
                    <IconEdit />
                  </Button>
                </Tooltip>
              </AnimateButton>
            </Grid>
            <Grid item>
              <AnimateButton>
                <Tooltip title={t('button.title.delete')} placement="bottom">
                  <Button color="error" variant="outlined" size="small" onClick={() => handleDeleteFunction(params.row)}>
                    <IconTrash />
                  </Button>
                </Tooltip>
              </AnimateButton>
            </Grid>
          </Grid>
        </>
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const params = createSearchParams(pageState);
      const response = await getFunctions(params);
      const check = handleResponseStatus(response, navigate)
      if(check) {
        const data = await response.data;
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
      } else {
        setIsAccess(false);
      }
      
    };
    fetchData();
  }, [pageState.search, pageState.order, pageState.orderDir, pageState.startIndex, pageState.pageSize, reloadData]);

  const handleAddRole = () => {
    setTitle(
      <>
        <IconUserPlus /> {t('function.title.add')}
      </>
    );
    setForm('add');
    dispatch(setOpenPopup(true));
  };

  const handleEditFunction = (functions) => {
    setTitle(
      <>
        <IconUserCheck /> {t('function.title.edit')}
      </>
    );
    setForm('edit');
    dispatch(selectedFunction(functions));
    dispatch(setOpenPopup(true));
  };

  const handleDeleteFunction = (functions) => {
    setTitle(<> {t('function.title.delete')} </>);
    setForm('delete');
    dispatch(selectedFunction(functions));
    dispatch(setOpenPopup(true));
  };

  return (
    <>
      <MainCard
        title={t('function.title')}
        secondary={<CustomButton handleClick={handleAddRole} icon={IconPlus} label={t('button.label.add')} title={t('button.title.add')} />}
      >{isAccess ? (   
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
            // console.log(newPage);
            setPageState((old) => ({ ...old, startIndex: newPage }));
          }}
          onPageSizeChange={(newPageSize) => {
            // console.log(newPageSize);
            setPageState((old) => ({ ...old, pageSize: newPageSize }));
          }}
          onSortModelChange={(newSortModel) => {
            const field = newSortModel[0]?.field;
            const sort = newSortModel[0]?.sort;
            // console.log('field: ' + field, 'sort: ' + sort);
            setPageState((old) => ({ ...old, order: field, orderDir: sort }));
          }}
          onFilterModelChange={(newSearchModel) => {
            const value = newSearchModel.items[0]?.value;
            // console.log(value);
            setPageState((old) => ({ ...old, search: value }));
          }}
          localeText={localeText}
          disableSelectionOnClick={true}
        />) : (<h1>Không có quyền truy cập</h1>)}
      </MainCard>
      <Popup title={title} openPopup={openPopup} bgcolor={form === 'delete' ? '#F44336' : '#2196F3'}>
        {form === 'add' ? <Add /> : form === 'edit' ? <Edit /> : <Delete />}
      </Popup>
    </>
  );
};

export default Functions;
