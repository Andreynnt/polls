import HttpService from "../services/HttpService";

const initModels = () => {
    return {
        leaders: null
    };
};

export default function leadersReducer(state = initModels(), action) {
     if (action.type === "GOT_LEADERS_FROM_BACKEND") {
        return {
            ...state,
            leaders: action.leaders
        }
    }
    console.log("leadersReducer():   ", state);
    return state;
}