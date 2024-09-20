import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// import '../src/assets/styles/plugins.css'
// import '../src/assets/styles/main.css'
import './assets2/css/main.css'
import './assets2/css/bootstrap.min.css';
import './assets2/css/normalize.css';
import './assets2/css/all.css';
import './assets2/css/font-awesome.min.css';
import './assets2/css/icomoon.css';
import './assets2/css/bootstrap-select.css';
import './assets2/css/scrollbar.css';
import './assets2/css/jquery.mmenu.all.css';
import './assets2/css/prettyPhoto.css';
import './assets2/css/transitions.css';
import './assets2/css/color.css';
import './assets2/css/responsive.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux"
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer style={{zIndex:999}} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
