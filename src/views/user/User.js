import { DataGrid } from '@mui/x-data-grid';
import { IconUserCheck, IconUserPlus } from '@tabler/icons';
import MainCard from 'components/cards/MainCard';
import { useNavigate } from 'react-router';

import Popup from 'components/controls/popup';

import {  setOpenPopup, setReloadData } from 'store/actions';
import { openPopupSelector, reloadDataSelector } from 'store/selectors';
import Add from '../user/Add';
import Edit from '../user/Edit';
import Delete from '../user/Delete';
import { getUsers } from 'services/userService';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams } from 'utils/createSearchParams';
import { handleResponseStatus } from 'utils/handleResponseStatus';
import useLocalText from 'utils/localText';
import { useTranslation } from 'react-i18next';
import ActionButtons from 'components/button/ActionButtons';
import AddButton from 'components/button/AddButton';
import i18n from 'i18n';

const User = () => {
  const language = i18n.language;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localeText = useLocalText()
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
      field: 'fullName',
      headerName: t('user.field.fullname'),
      flex: 1
    },
    {
      field: 'userName',
      headerName: t('user.field.username'),
      flex: 1
    },
    {
      field: 'email',
      headerName: t('user.field.email'),
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
          <ActionButtons type="edit" handleEdit={handleEditUser} params={params.row} />
          <ActionButtons type="delete" handleDelete={handleDeleteUser} params={params.row} />
        </>
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const params = await createSearchParams(pageState);
      const response = await getUsers(params);
      const check = await handleResponseStatus(response, navigate);
      if (check) {
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

  const handleAddUser = () => {
    setTitle(
      <>
        <IconUserPlus /> {t('user.title.add')}
      </>
    );
    setForm('add');
    dispatch(setOpenPopup(true));
  };
  const handleEditUser = (user) => {
    setTitle(
      <>
        <IconUserCheck /> {t('user.title.edit')}
      </>
    );
    setForm('edit');
    dispatch(selectedUser(user));
    dispatch(setOpenPopup(true));
  };

  const handleDeleteUser = (role) => {
    setTitle(<> {t('user.title.delete')} </>);
    setForm('delete');
    dispatch(selectedRole(role));
    dispatch(setOpenPopup(true));
  };

  return (
    <>
      <MainCard
        title={t('user.title')}
        secondary={<AddButton handleClick={handleAddUser} />}
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
          />
        ) : (
          <h1>{t('not.allow.access')}</h1>
        )}
      </MainCard>
      <Popup title={title} openPopup={openPopup} bgcolor={form === 'delete' ? '#F44336' : '#2196F3'}>
        {form === 'add' ? <Add /> : form === 'edit' ? <Edit /> : <Delete />}
      </Popup>
    </>
  );
};

export default User;
