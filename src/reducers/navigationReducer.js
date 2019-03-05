const initApp = () => {
    return {
        activePanel: 'polls',
        activeStory: 'polls',
        selectedPoll: null,
        alert: null,
        pollsMode: 'new'
    };
};

export default function navigationReducer(state = initApp(), action) {
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
    console.log("navigationReducer():   ", state);
    return state;
}