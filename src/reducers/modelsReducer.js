import HttpService from "../services/HttpService";

const initModels = () => {
    return {
        pollModels: null,
        answeredPollModels: null
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
    } else if (action.type === "WATCH_NEXT_ANSWER") {
        let updatedAnsweredPollModels = state.answeredPollModels;
        updatedAnsweredPollModels[action.pollNum].currentQuestionNum++;
        //updatedAnsweredPollModels[action.pollNum].answers.push(action.answer);
        return {
            ...state,
            answeredPollModels: updatedAnsweredPollModels
        }
    } else if (action.type === "GOT_POLLS_FROM_BACKEND") {
        return {
            ...state,
            pollModels: [...action.pollModels]
        }
    } else if (action.type === "GOT_ANSWERED_POLLS_FROM_BACKEND") {
        return {
            ...state,
            answeredPollModels: [...action.pollModels]
        }
    } else if (action.type === "SEND_ANSWERS") {
        state.pollModels[action.pollNum].answers.push(action.lastAnswer);
        console.log(state.pollModels[action.pollNum].answers);
        state.pollModels[action.pollNum].status = "done";

        let poll = state.pollModels[action.pollNum];
        state.answeredPollModels.push(poll);
        state.pollModels.splice(action.pollNum, 1);

        let result = {
            answers: poll.answers,
            poll_id: poll.id,
            resp_id: action.userId
        };

        HttpService.sendAnswers(result);
    }
    console.log("modelsReducer():   ", state);
    return state;
}