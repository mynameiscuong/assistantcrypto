import {useState,Fragment} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {useEffect} from 'react';
import {CryptoState} from '../../CryptoContext';
import Avatar from '@material-ui/core/Avatar';
import {Button} from '@material-ui/core';
import {signOut} from '@firebase/auth';
import {auth} from '../../firebase';
import {AiFillDelete} from 'react-icons/ai';
import {numberWithCommas} from '../CoinsTable';
import {doc, setDoc} from '@firebase/firestore';
import {db} from '../../firebase';

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  picture: {
    width: 100,
    height: 100,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "#EEBC1D",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  },
});


export default function UserSidebar() {
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = useState({
        right: false,
    });

    const {user, setAlert, watchlist, coins, fetchCoins, symbol, currency} = CryptoState();
    useEffect(() => {
        fetchCoins();
    }, [currency]);
    
    // console.log(coins);
    // console.log(watchlist);
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };
    const logOut = () => {
        signOut(auth);

        setAlert({
            open:true,
            type: "success",
            message: "Log Out Successful!",
        })
    }
/// tìm cách tái sử dụng lại hàm removeFromWatchlist
/// từ CoinPage
    const removeFromWatchlist = async(coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
  
          try {
            await setDoc(coinRef,{
                coins:watchlist.filter((watch) => watch !== coin?.id),
              },
              { merge: "true" }
            );
  
              setAlert({
                open:true,
                message: `${coin.name} removed from your watchlist!`,
                type: "success",
              });
          } catch(error){
              setAlert({
                open:true,
                message: error.message,
                type: "error",
              });
          }
      }

    return (
        <div>
        {['right'].map((anchor) => (
            <Fragment key={anchor}>
                <Avatar onClick={toggleDrawer(anchor, true)}
                    style={{ height: 38,
                            width: 38,
                            marginLeft: 15,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D"}} 
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                />
            <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
            >
                <div className={classes.container}>
                    <div className={classes.profile}>
                        <Avatar onClick={toggleDrawer(anchor, true)}
                            className={classes.picture} 
                            src={user.photoURL}
                            alt={user.displayName || user.email}
                        />
                        <span 
                            style={{ 
                                width: "100%",
                                fontSize: 25,
                                textAlign: "center",
                                fontWeight: "bolder",
                                wordWrap: "break-word",
                            }}
                        >
                            {user.displayName || user.email}
                        </span>
                        <div className={classes.watchlist}>
                            <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                Watchlist
                            </span>
                            {coins.map((coin) => {
                                // console.log(watchlist);
                                if(watchlist && watchlist.includes(coin.id)){
                                    return (
                                        <div className={classes.coin} onClick={() => history.push(`/coins/${coin.id}`)}>
                                            <span>{coin.name}</span>
                                            <span style={{ display: "flex", gap: 8 }}>
                                                {symbol}
                                                {numberWithCommas(coin.current_price.toFixed(2))}
                                                <AiFillDelete 
                                                    style={{ cursor: "pointer" }}
                                                    fontSize="16"
                                                    onClick={() => removeFromWatchlist(coin)} 
                                                    />
                                            </span>
                                        </div>
                                    );
                                };
                            })}

                        </div>
                        
                    </div>

                    <Button 
                        variant="contained"
                        className={classes.logout}
                        onClick={logOut}>
                            Log Out
                        </Button>
                </div>
            </SwipeableDrawer>
            </Fragment>
        ))}
        </div>
    );
}