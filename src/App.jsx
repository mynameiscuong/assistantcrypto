import { BrowserRouter, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import Header from './components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/Coinpage';
import Alert from './components/Alert';
import './App.css';

export default function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: '#fff',
      minHeight: '100vh',
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/coins/:id" exact component={CoinPage} />
      </div>
      <Alert />
    </BrowserRouter>
  );
}
