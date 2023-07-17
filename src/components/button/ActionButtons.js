import { Grid, Button, Tooltip } from '@mui/material';
import { IconEdit, IconUsers, IconTrash, IconLockOff, IconCheckbox, IconHandMove } from '@tabler/icons';
import AnimateButton from 'components/extended/AnimateButton';
import { useTranslation } from 'react-i18next';

const ActionButtons = ({ type, handleAdd, handleEdit, handleDelete, handleDeActive, handleActive, params, title }) => {
  const { t } = useTranslation();

  const getButtons = () => {
    switch (type) {
      case 'add':
        return [{ title: title || 'button.title.action', icon: <IconUsers />, color: 'success', onClick: () => handleAdd(params) }];
      case 'action':
        return [{ title: title || 'button.title.action', icon: <IconHandMove />, color: 'success', onClick: () => handleAdd(params) }];
      case 'edit':
        return [{ title: 'button.title.edit', icon: <IconEdit />, color: 'info', onClick: () => handleEdit(params) }];
      case 'delete':
        return [{ title: 'button.title.delete', icon: <IconTrash />, color: 'error', onClick: () => handleDelete(params) }];
      case 'deActive':
        return [{ title: 'button.title.deActive', icon: <IconLockOff />, color: 'error', onClick: () => handleDeActive(params) }];
      case 'active':
        return [{ title: 'button.title.active', icon: <IconCheckbox />, color: 'primary', onClick: () => handleActive(params) }];
      default:
        return [];
    }
  };

  const buttons = getButtons();

  return (
    <Grid container spacing={1} direction="row">
      {buttons.map((button, index) => (
        <Grid item key={index}>
          <AnimateButton>
            <Tooltip title={t(button.title)} placement="bottom">
              <Button color={button.color} variant="outlined" size="small" onClick={button.onClick}>
                {button.icon}
              </Button>
            </Tooltip>
          </AnimateButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActionButtons;
