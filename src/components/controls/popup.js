import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide, IconButton, Tooltip } from '@mui/material';
import { forwardRef } from 'react';
import MuiTypography from '@mui/material/Typography';
import { IconX } from '@tabler/icons';
import AnimateButton from 'components/extended/AnimateButton';
import { setOpenPopup } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} timeout={700} />;
});

export default function Popup(props) {
  const { t } = useTranslation()
  const { title, children, openPopup } = props;
  const dispatch = useDispatch();

  const handleCloseClick = () => {
    dispatch(setOpenPopup(false));
  };

  return (
    <div>
      <Dialog
        open={openPopup}
        TransitionComponent={Transition}
        keepMounted
        fullWidth= {true}
        maxWidth="sm"
        style={{ marginBottom: '10%' }}
      >
        <DialogTitle bgcolor={'#2196F3'} display={'flex'}>
          <MuiTypography variant="h3" color={'#fff'} flexGrow={1}>
            {title}
          </MuiTypography>
          <AnimateButton>
            <Tooltip title={t('button.close')} placement="bottom">
              <IconButton size='small' style={{ color: 'white' }} onClick={handleCloseClick}>
                <IconX fontSize="large" />
              </IconButton>
            </Tooltip>
          </AnimateButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText marginTop={2}>{children}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
