import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import App from './App';
import {Provider} from "react-redux";
import { createStore } from "redux";
import reducer from './reducers/reducers';

// Init VK App
connect.send('VKWebAppInit', {});

//registerServiceWorker();

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
