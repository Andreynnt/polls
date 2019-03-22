const initUser = () => {
    return {
        user: null
    };
};

export default function userReducer(state = initUser(), action) {
    if (action.type === "GOT_USER_INFO") {
        if (!action.user.coins) {
            action.user.balance = 0
        }
        return {
            user: action.user
        }
    } else if (action.type === "GOT_USER_TOKEN") {
        return {
            ...state,
            user: {
                ...state.user,
                access_token: action.accessToken
            }
        }
    } else if (action.type === "PLUS_ONE_COIN") {
        let newBalance = 1;
        if (state.user && state.user.balance) {
            newBalance = state.user.balance + 1;
        }
        return {
            ...state,
            user: {
                ...state.user,
                balance: newBalance
            }
        }
    }
    console.log("userReducer():   ", state, "type", action.type);
    return state;
}