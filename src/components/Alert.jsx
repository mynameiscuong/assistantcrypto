
import Snackbar from '@material-ui/core/Snackbar';
import {CryptoState} from '../CryptoContext';
import MuiAlert from '@material-ui/lab/Alert';

export default function Alert() {

    const {alert, setAlert} = CryptoState();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
    }

    setAlert({open: false})
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} elevation={10} variant="filled" severity={alert.type}>
            {alert.message}
        </MuiAlert>
    </Snackbar>
  );
};
