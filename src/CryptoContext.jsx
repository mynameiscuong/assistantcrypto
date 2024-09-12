import {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {CoinList} from './config/api';
import {onAuthStateChanged} from '@firebase/auth';
import {auth, db} from './firebase';
import {doc, onSnapshot} from '@firebase/firestore';

const Crypto = createContext();

export default function CryptoContext ({children}) {

    const [currency, setCurrency] = useState("VND");
    const [symbol, setSymbol] = useState("₫");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
    });
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState();


    useEffect(() => {
        if(user){
            const coinRef = doc(db, "watchlist", user.uid);

            var unsubcribe = onSnapshot(coinRef, (coin) => {
                if(coin && coin.exists()){
                    // console.log(coin.data().coins);
                    setWatchlist(coin.data().coins);
                } else {
                    console.log("No Items in Watchlist");
                }
            });
            
            return () => {
                unsubcribe();
            };
        }
    },[user]);

    useEffect(() => {
        onAuthStateChanged(auth, user=>{
            if(user){
                setUser(user);
            } else {
                setUser(null);
            }
        })
    },[]);

    // console.log(user);

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);

        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        if(currency === "VND"){
            setSymbol("₫");
        } else if (currency==="USD"){
            setSymbol("$");
        }}, [currency]);
    
    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist,}}>
            {children}
        </Crypto.Provider>
    );
};

export const CryptoState = () => {
    return useContext(Crypto);
}