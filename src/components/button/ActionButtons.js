import { Grid, Button, Tooltip } from '@mui/material';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons';
import AnimateButton from 'components/extended/AnimateButton';
import { useTranslation } from 'react-i18next';

const ActionButtons = ({ type, handleAdd, handleEdit, handleDelete, params }) => {
    const { t } = useTranslation();

    const getButtons = () => {
        switch (type) {
        case 'add':
            return [
            { title: 'button.title.action', icon: <IconPlus />, color: 'success', onClick: () => handleAdd(params) },
            ];
        case 'edit':
            return [
            { title: 'button.title.edit', icon: <IconEdit />, color: 'info', onClick: () => handleEdit(params) },
            ];
        case 'delete':
            return [
            { title: 'button.title.delete', icon: <IconTrash />, color: 'error', onClick: () => handleDelete(params) },
            ];
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
  
