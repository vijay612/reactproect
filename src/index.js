import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {GetZohoData} from './components/util/getZohoData';



export async function TwilioApp(){
    const dataResponse = await GetZohoData();
    //console.log(dataResponse);
    ReactDOM.render(<App data={dataResponse} />, document.getElementById('root'));
}

TwilioApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
