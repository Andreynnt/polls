const initUser = () => {
    return {
        user: null
    };
};

export default function userReducer(state = initUser(), action) {
    if (action.type === "GOT_USER_INFO") {
        return {
            ...state,
            user: action.user
        }
    }
    console.log("userReducer():   ", state);
    return state;
}