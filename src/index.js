import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
//import connect from '@vkontakte/vkui-connect';
import App from './App';
import HttpService from "./services/HttpService";
import PollModel from "./models/PollModel";
import {connect, Provider} from "react-redux";
import { createStore } from "redux";
// import registerServiceWorker from './sw';

// Init VK App
//connect.send('VKWebAppInit', {});

// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT 
// registerServiceWorker();


const polls = HttpService.parseDefaultJson();
let pollModels = polls.map(poll => new PollModel(poll));

const initialAppState = {
    activePanel: 'polls',
    fetchedUser: null,
    activeStory: 'polls',
    selectedPoll: null,
    pollModels: pollModels,
    alert: null,
    pollsMode: 'new'
};

function appState(state = initialAppState, action) {
    console.log("action.payload = ", action.payload);
    if (action.type === "CHANGE_STORY") {
        return {
            ...state,
            activeStory: action.payload
        }
    } else if (action.type === "CHANGE_PANEL") {
        return {
            ...state,
            activePanel: action.payload
        }
    } else if (action.type === "CLICK_CELL") {
        return {
            ...state,
            activePanel: "poll",
            selectedPoll: action.payload
        }
    } else if (action.type === "RETURN_AND_SHOW_POPOUT") {
        return {
            ...state,
            activePanel: "polls",
            alert: action.payload
        }
    } else if (action.type === "CLOSE_POPOUT") {
        return {
            ...state,
            alert: null
        }
    } else if (action.type === "CHANGE_MODE") {
        return {
            ...state,
            pollsMode: action.payload
        }
    }
    return state
}

const store = createStore(appState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
