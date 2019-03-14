import HttpService from "../services/HttpService";
import PollModel from "../models/PollModel";

const initModels = () => {
    const polls = HttpService.parseDefaultJson();
    let pollModels = polls.map(poll => new PollModel(poll));

    return {
        pollModels: pollModels
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
    }
    return state;
}