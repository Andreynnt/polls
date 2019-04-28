const initApp = () => {
    return {
        activePanel: 'StartInfoPanel',
        activeStory: 'StartInfoPanel',
        selectedPoll: null,
        selectedPollNum: null,
        alert: null,
        pollsMode: 'new'
    };
};

export default function navigationReducer(state = initApp(), action) {
    if (action.type === "CHANGE_STORY") {
        if (state.activePanel === "preloader") {
            return state
        }
        return {
            ...state,
            activeStory: action.payload
        }
    } else if (action.type === "CHANGE_STORY_AND_PANEL") {
        return {
                ...state,
                activeStory: action.payload.story,
                activePanel: action.payload.panel
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
            selectedPoll: action.payload.model,
            selectedPollNum: action.payload.i
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
    } else if (action.type === "CLOSE_MAIN_PRELOADER_AND_OPEN_APP") {
        return {
            ...state,
            activePanel: "polls",
            activeStory: "polls"
        }
    } else if (action.type === "GOT_ERROR_FROM_BACKEND") {
        //todo показывать error panel
       return state;
    }
    //console.log("navigationReducer():   ", state);
    return state;
}