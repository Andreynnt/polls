const initModels = () => {
    return {
        pollModels: null
    };
};

export default function modelsReducer(state = initModels(), action) {
    if (action.type === "USER_ANSWERED") {
        let updatedModels = state.pollModels;
        updatedModels[action.pollNum].currentQuestionNum++;
        return {
            ...state,
            pollModels: updatedModels
        }
    } else if (action.type === "GOT_POLLS_FROM_BACKEND") {
        return {
            ...state,
            pollModels: action.pollModels
        }
    }
    console.log("modelsReducer():   ", state);
    return state;
}