import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import './index.css';
import App from './App';
import CryptoContext from './CryptoContext';
import "react-alice-carousel/lib/react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import 'firebase/app';

ReactDOM.render(
  <StrictMode>
    <CryptoContext>
        <App />
    </CryptoContext>
  </StrictMode>,
  document.getElementById('root')
);

