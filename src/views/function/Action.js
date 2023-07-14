import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/cards/MainCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReloadData, selectedRole, setOpenSubPopup } from 'store/actions';
import { openSubPopupSelector, reloadDataSelector } from 'store/selectors';
import Add from '../role/AddRole';
import Edit from '../role/EditRole';
import Delete from '../role/DeleteRole';
import { getRoles } from 'services/roleService';
import { useTranslation } from 'react-i18next';
import useLocalText from 'utils/localText';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { handleResponseStatus } from 'utils/handleResponseStatus';
import ActionButtons from 'components/button/ActionButtons';
import AddButton from 'components/button/AddButton';
import SubPopup from 'components/controls/SubPopup';
import i18n from 'i18n';

const Action = () => {
  const language = i18n.language;
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const localeText = useLocalText()
  const openSubPopup = useSelector(openSubPopupSelector);
  const [title, setTitle] = useState('');
  const [form, setForm] = useState('');
  const reloadData = useSelector(reloadDataSelector);
  const { t } = useTranslation();
  const [isAccess, setIsAccess] = useState(true);
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
          <ActionButtons type="edit" handleEdit={handleEditRole} params={params.row} />
          <ActionButtons type="delete" handleDelete={handleDeleteRole} params={params.row} />
        </>
      ),      
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const params = await createSearchParams(pageState)
      const response = await getRoles(params);
      const check = await handleResponseStatus(response, navigate);
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
  }, [pageState.search, pageState.order, pageState.orderDir ,pageState.startIndex, pageState.pageSize, reloadData]);

  const handleAddRole = () => {
    setTitle(<> {t('role.title.add')} </>);
    setForm('add')
    dispatch(setOpenSubPopup(true));
  };

  const handleEditRole = (role) => {
    setTitle(<> {t('role.title.edit')} </>);
    setForm('edit')
    dispatch(selectedRole(role));
    dispatch(setOpenSubPopup(true));
  };

  const handleDeleteRole = (role) => {
    setTitle(<> {t('role.title.delete')} </>);
    setForm('delete')
    dispatch(selectedRole(role));
    dispatch(setOpenSubPopup(true));
  };

  console.log('form'+form);

  return (
    <>
      <MainCard
        title={t('role.title')}
        secondary={<AddButton handleClick={handleAddRole}/>}
      >
        {isAccess ? (
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
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }}
          onSortModelChange={(newSortModel) => {
            const field = newSortModel[0]?.field;
            const sort = newSortModel[0]?.sort;
            setPageState((old) => ({ ...old, order: field, orderDir: sort }))
          }}
          onFilterModelChange={(newSearchModel) => {
            const value = newSearchModel.items[0]?.value;
            setPageState((old) => ({ ...old, search: value }))
          }}
          localeText={language === 'vi' ? localeText : null}
          disableSelectionOnClick={true}
        />
        ) : (<h1>{t('not.allow.access')}</h1>)
        }
       
      </MainCard>
      <SubPopup title={title} openSubPopup={openSubPopup} bgcolor={form === 'delete' ? '#F44336' : '#2196F3'}>
        {form === 'add' ? <Add /> : form === 'edit' ? <Edit /> : <Delete />}
      </SubPopup>
    </>
  );
};

export default Action;
