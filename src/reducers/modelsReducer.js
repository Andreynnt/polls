import HttpService from "../services/HttpService";

const initModels = () => {
    return {
        pollModels: null
    };
};

export default function modelsReducer(state = initModels(), action) {
    if (action.type === "USER_ANSWERED") {
        let updatedModels = state.pollModels;
        updatedModels[action.pollNum].currentQuestionNum++;
        updatedModels[action.pollNum].answers.push(action.answer);
        return {
            ...state,
            pollModels: updatedModels
        }
    } else if (action.type === "GOT_POLLS_FROM_BACKEND") {
        return {
            ...state,
            pollModels: action.pollModels
        }
    } else if (action.type === "SEND_ANSWERS") {
        state.pollModels[action.pollNum].answers.push(action.lastAnswer);
        console.log(state.pollModels[action.pollNum].answers);
        state.pollModels[action.pollNum].status = "done";

        let result = {
            answers: state.pollModels[action.pollNum].answers,
            poll_id: state.pollModels[action.pollNum].id,
            resp_id: action.userId
        };

        HttpService.sendAnswers(result);
    }
    console.log("modelsReducer():   ", state);
    return state;
}