import {AppBar, Container, Toolbar, Typography, 
    Select, MenuItem} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import {createTheme, makeStyles,ThemeProvider} from "@material-ui/core/styles";
import {CryptoState}  from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles((theme) => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },
}));

export default function Header() {

    const classes = useStyles();
    const history = useHistory();
    const {currency, setCurrency, user } = CryptoState();
    // console.log(currency);
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        },
    });

    return(
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography 
                            onClick={() => history.push(`/`)}
                            className={classes.title}
                            variant='h6'>
                            CRYPTO ASSISTANT
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                        <Select 
                            variant="outlined" 
                            style={{ 
                                width: 100,
                                height: 40,
                                marginRight: 15,
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}>
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'VND'}>VND</MenuItem>

                        </Select>

                        {user ? <UserSidebar /> : <AuthModal />}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}