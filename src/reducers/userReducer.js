const initUser = () => {
    return {
        user: null,
        logs: null
    };
};

export default function userReducer(state = initUser(), action) {
    if (action.type === "GOT_USER_INFO") {
        console.log(action.user, action.logs);
        return {
            user: action.user,
            logs: action.logs
        }
    } else if (action.type === "GOT_USER_TOKEN") {
        return {
            ...state,
            user: {
                ...state.user,
                access_token: action.accessToken
            }
        }
    }
    console.log("userReducer():   ", state);
    return state;
}