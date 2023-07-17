import { DataGrid } from '@mui/x-data-grid';
import { IconUserCheck, IconUserPlus } from '@tabler/icons';
import MainCard from 'components/cards/MainCard';
import { useNavigate } from 'react-router';
import config from '../../config';

import Popup from 'components/controls/popup';

import { selectedUser, setOpenPopup, setReloadData } from 'store/actions';
import { openPopupSelector, reloadDataSelector, userLoginSelector } from 'store/selectors';
import Add from '../user/Add';
import Edit from '../user/Edit';
import Delete from '../user/Delete';
import DeActive from '../user/DeActive';
import Active from '../user/Active';
import PermissionsGroup from '../user/PermissionsGroup';

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
  const localeText = useLocalText();
  const openPopup = useSelector(openPopupSelector);
  const userLogin = useSelector(userLoginSelector);
  const [title, setTitle] = useState('');
  const [urlFileImage, setUrlFileImage] = useState('');
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
      field: 'image',
      headerName: t('user.field.avatar'),
      flex: 1,
      editable: true,
      justifyContent: 'center',
      alignItems: 'center',
      renderCell: (params) =>
        params.row.avatar ? (
          <img
            src={`${urlFileImage}${params.row.avatar}`}
            alt="avatar"
            style={{
              width: 45,
              height: 45,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          />
        ) : (
          <></>
        )
    },
    {
      field: 'userName',
      headerName: t('user.field.username'),
      flex: 2
    },
    {
      field: 'fullName',
      headerName: t('user.field.fullname'),
      flex: 2
    },
    {
      field: 'email',
      headerName: t('user.field.email'),
      flex: 2
    },
    {
      field: 'actions',
      headerName: t('action'),
      width: 300,
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        params.row.userName === userLogin.username ? (
          <></>
        ) : params.row.isActive ? (
          <>
            <ActionButtons type="add" handleAdd={handleAdd} title={t('user.title.permissionGroup')} params={params.row} />
            <ActionButtons type="edit" handleEdit={handleEdit} params={params.row} />
            <ActionButtons type="deActive" handleDeActive={handleDeActive} params={params.row} />
            <ActionButtons type="delete" handleDelete={handleDelete} params={params.row} />
          </>
        ) : (
          <ActionButtons type="active" handleActive={handleActive} params={params.row} />
        )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      setUrlFileImage(config.urlFile + 'Users/');
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
  const handleEdit = (user) => {
    setTitle(
      <>
        <IconUserCheck /> {t('user.title.edit')}
      </>
    );
    setForm('edit');
    dispatch(selectedUser(user));
    dispatch(setOpenPopup(true));
  };

  const handleDelete = (role) => {
    setTitle(<> {t('user.title.delete')} </>);
    setForm('delete');
    dispatch(selectedUser(role));
    dispatch(setOpenPopup(true));
  };

  const handleDeActive = (user) => {
    setTitle(<> {t('user.title.deActive')} </>);
    setForm('deActive');
    dispatch(selectedUser(user));
    dispatch(setOpenPopup(true));
  };

  const handleActive = (user) => {
    setTitle(<> {t('user.title.active')} </>);
    setForm('active');
    dispatch(selectedUser(user));
    dispatch(setOpenPopup(true));
  };

  const handleAdd = (user) => {
    setTitle(<> {t('role.title')} </>);
    setForm('group');
    dispatch(selectedUser(user));
    dispatch(setOpenPopup(true));
  };

  return (
    <>
      <MainCard title={t('user.title')} secondary={<AddButton handleClick={handleAddUser} />}>
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
      <Popup
        title={title}
        maxWidth={form === 'group' ? 'md' : 'sm'}
        openPopup={openPopup}
        bgcolor={form === 'delete' || form === 'deActive' ? '#F44336' : '#2196F3'}
      >
        {form === 'add' ? (
          <Add />
        ) : form === 'edit' ? (
          <Edit />
        ) : form === 'delete' ? (
          <Delete />
        ) : form === 'deActive' ? (
          <DeActive />
        ) : form === 'active' ? (
          <Active />
        ) : (
          <PermissionsGroup />
        )}
      </Popup>
    </>
  );
};

export default User;
