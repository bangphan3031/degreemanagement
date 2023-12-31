import i18n from 'i18n';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/cards/MainCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { getRolesViaUser, saveUserRole } from 'services/userService';
import { setOpenPopup, setReloadData, showAlert } from 'store/actions';
import { selectedUserSelector, reloadDataSelector } from 'store/selectors';
import { handleResponseStatus } from 'utils/handleResponseStatus';
import useLocalText from 'utils/localText';
import { useTranslation } from 'react-i18next';
import { Checkbox, Grid } from '@mui/material';
import SaveButtonTable from 'components/button/SaveButtonTable';
import ExitButton from 'components/button/ExitButton';

const PermissionsGroup = () => {
  const language = i18n.language;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localeText = useLocalText();
  const reloadData = useSelector(reloadDataSelector);
  const { t } = useTranslation();
  const [isAccess, setIsAccess] = useState(true);
  const selectedUser = useSelector(selectedUserSelector);

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
      field: 'name',
      headerName: t('role.field.name'),
      flex: 1
    },
    {
      field: 'actions',
      headerName: t('action'),
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Checkbox
            checked={params.row.hasPermission}
            color="primary"
            onChange={(event) => handleCheckboxChange(event, params.row.id)}
            name={params.row.userId ? params.row.userId.toString() : ''}
          />
        </>
      )
    }
  ];

  const handleCheckboxChange = (event, id) => {
    const checked = event.target.checked;

    // Cập nhật giá trị hasPermission trong state dựa trên id của hàng được chọn
    setPageState((prevState) => ({
      ...prevState,
      data: prevState.data.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            hasPermission: checked
          };
        }
        return row;
      })
    }));
  };

  const handleSave = async () => {
    const selectedUserIds = pageState.data.reduce((result, role) => {
      if (role.hasPermission) {
        return result !== '' ? `${result},${role.roleId}` : `${role.roleId}`;
      }
      return result;
    }, '');

    const data = {
      userId: selectedUser.userId,
      roleIds: selectedUserIds
    };

    const response = await saveUserRole(data);
    const check = handleResponseStatus(response, navigate);
    if (!check) {
      dispatch(showAlert(new Date().getTime().toString(), 'error', response.message.toString()));
    } else {
      if (response.isSuccess == false) {
        dispatch(showAlert(new Date().getTime().toString(), 'error', response.message.toString()));
      } else {
        dispatch(showAlert(new Date().getTime().toString(), 'success', response.message.toString()));
        dispatch(setOpenPopup(false));
        dispatch(setReloadData(true));
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const params = await createSearchParams(pageState);
      if (selectedUser) {
        const response = await getRolesViaUser(selectedUser.userId, params);
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
      }
    };
    fetchData();
  }, [pageState.search, pageState.order, pageState.orderDir, pageState.startIndex, pageState.pageSize, selectedUser, reloadData]);

  return (
    <>
      <MainCard>
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
      <Grid item xs={12} container spacing={2} justifyContent="flex-end" mt={1}>
        <Grid item>
          <SaveButtonTable onClick={handleSave} />
        </Grid>
        <Grid item>
          <ExitButton />
        </Grid>
      </Grid>
    </>
  );
};

export default PermissionsGroup;
