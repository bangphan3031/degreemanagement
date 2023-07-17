import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { alertContentSelector, alertIdSelector, alertTypeSelector, showAlertSelector } from 'store/selectors';

export default function Alert() {
  const showAlert = useSelector(showAlertSelector);
  const alertId = useSelector(alertIdSelector);
  const alertType = useSelector(alertTypeSelector);
  const alertContent = useSelector(alertContentSelector);
  const prevAlertIdRef = useRef(null);

  useEffect(() => {
    if (showAlert) {
      if (alertId !== prevAlertIdRef.current) {
        toast[alertType](alertContent, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      }

      prevAlertIdRef.current = alertId;
    }
  }, [showAlert, alertId, alertType, alertContent]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
