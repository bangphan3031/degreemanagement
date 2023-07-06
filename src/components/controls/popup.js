import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@mui/material';
import { forwardRef } from 'react';
import MuiTypography from '@mui/material/Typography';
import { IconX } from '@tabler/icons';
import AnimateButton from 'components/extended/AnimateButton';
import { setOpenPopup } from '../../store/actions';
import { useDispatch } from 'react-redux';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} timeout={700} />;
});

export default function Popup(props) {
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
            <Button variant="contained" color="inherit" size="small" onClick={handleCloseClick}>
              <IconX />
            </Button>
          </AnimateButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText marginTop={2}>{children}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
