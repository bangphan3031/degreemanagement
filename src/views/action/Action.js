import { DataGrid } from '@mui/x-data-grid';
import { IconPlus, IconUserCheck, IconUserPlus } from '@tabler/icons';
import CustomButton from 'components/button/CustomButton';
import MainCard from 'components/cards/MainCard';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSubPopup, setReloadData, selectedAction } from 'store/actions';
import { openSubPopupSelector, reloadDataSelector } from 'store/selectors';
import { getAction } from 'services/actionService';
import { useNavigate } from 'react-router-dom';
import { handleResponseStatus } from 'utils/handleResponseStatus';
import { useTranslation } from 'react-i18next';
import useLocalText from 'utils/localText';
import { selectedFunctionSelector } from 'store/selectors';
import { createSearchParams } from 'utils/createSearchParams';
import Popup from 'components/controls/popup';
import ActionButtons from 'components/button/ActionButtons';

const Action = () => {
  const { t } = useTranslation();
  const localeText = useLocalText();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedFunction = useSelector(selectedFunctionSelector);
  const openSubPopup = useSelector(openSubPopupSelector);
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
      field: 'action',
      headerName: t('action.field.action')
    },
    {
      field: 'actions',
      headerName: t('action'),
      width: 240,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <ActionButtons type="edit" handleEdit={handleEditAction} params={params.row} />
          <ActionButtons type="delete" handleDelete={handleDeleteAction} params={params.row} />
        </>
      )
    }
  ];
  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const params = await createSearchParams(pageState, navigate);
      const response = await getAction(selectedFunction.functionId, params);
      console.log(response);

      const check = handleResponseStatus(response, navigate);
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
  }, [
    selectedFunction.functionId,
    pageState.search,
    pageState.order,
    pageState.orderDir,
    pageState.startIndex,
    pageState.pageSize,
    reloadData
  ]);

  const handleAddAction = () => {
    setTitle(
      <>
        <IconUserPlus /> {t('action.title.add')}
      </>
    );
    setForm('add');
    dispatch(setOpenSubPopup(true));
  };

  const handleEditAction = (action) => {
    setTitle(
      <>
        <IconUserCheck /> {t('action.title.edit')}
      </>
    );
    setForm('edit');
    dispatch(selectedAction(action));
    dispatch(setOpenSubPopup(true));
  };

  const handleDeleteAction = (functions) => {
    setTitle(<> {t('action.title.delete')} </>);
    setForm('delete');
    dispatch(selectedAction(functions));
    dispatch(setOpenSubPopup(true));
  };

  return (
    <>
      <MainCard
        title={' '}
        secondary={
          <CustomButton handleClick={handleAddAction} icon={IconPlus} label={t('button.label.add')} title={t('button.title.add')} />
        }
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
          />
        ) : (
          <h1>Không có quyền truy cập</h1>
        )}
      </MainCard>
      <Popup title={title} openPopup={openSubPopup} type="subpopup" bgcolor={form === 'delete' ? '#F44336' : '#2196F3'}>
        {form === 'add' ? <Add /> : form === 'edit' ? <Edit /> : <Delete />}
      </Popup>
    </>
  );
};

export default Action;
