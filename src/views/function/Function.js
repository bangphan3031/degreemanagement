import { DataGrid } from '@mui/x-data-grid';
import { IconUserCheck, IconUserPlus } from '@tabler/icons';
import MainCard from 'components/cards/MainCard';
import Popup from 'components/controls/popup';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenPopup, setReloadData, selectedFunction } from 'store/actions';
import { openPopupSelector, reloadDataSelector } from 'store/selectors';
import { getFunctions } from 'services/functionService';
import { useNavigate } from 'react-router-dom';
import { handleResponseStatus } from 'utils/handleResponseStatus';
import { useTranslation } from 'react-i18next';
import useLocalText from 'utils/localText';
import ActionButtons from 'components/button/ActionButtons';
import AddButton from 'components/button/AddButton';
import Action from './Action';
import { createSearchParams } from 'utils/createSearchParams';
import i18n from 'i18n';

const Functions = () => {
  const language = i18n.language;
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
          <ActionButtons type="add" handleAdd={handleAddAction} params={params.row} />
          <ActionButtons type="edit" handleEdit={handleEditFunction} params={params.row} />
          <ActionButtons type="delete" handleDelete={handleDeleteFunction} params={params.row} />
        </>
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const params = await createSearchParams(pageState);
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
    setTitle(<> <IconUserPlus /> {t('function.title.add')} </>);
    setForm('add');
    dispatch(setOpenPopup(true));
  };

  const handleAddAction= (functions) => {
    setTitle(<> {t('function.title.add')} </>);
    setForm('action');
    dispatch(selectedFunction(functions));
    dispatch(setOpenPopup(true));
  };

  const handleEditFunction = (functions) => {
    setTitle(<> <IconUserCheck /> {t('function.title.edit')} </>);
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
        secondary={<AddButton handleClick={handleAddRole} />}
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
            setPageState((old) => ({ ...old, startIndex: newPage }));
          }}
          onPageSizeChange={(newPageSize) => {
            setPageState((old) => ({ ...old, pageSize: newPageSize }));
          }}
          onSortModelChange={(newSortModel) => {
            const field = newSortModel[0]?.field;
            const sort = newSortModel[0]?.sort;
            setPageState((old) => ({ ...old, order: field, orderDir: sort }));
          }}
          onFilterModelChange={(newSearchModel) => {
            const value = newSearchModel.items[0]?.value;
            setPageState((old) => ({ ...old, search: value }));
          }}
          localeText={language === 'vi' ? localeText : null}
          disableSelectionOnClick={true}
        />) : (<h1>Không có quyền truy cập</h1>)}
      </MainCard>
      <Popup title={title} openPopup={openPopup} maxWidth={'md'} bgcolor={form === 'delete' ? '#F44336' : '#2196F3'}>
        {form === 'add' ? <Add /> : form === 'edit' ? <Edit /> : form === 'action' ? <Action /> : <Delete />}
      </Popup>
    </>
  );
};

export default Functions;
