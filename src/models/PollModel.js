import PropTypes from 'prop-types';

export default class PollModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.author = data.author;
        this.polls = data.polls;
        this.status = data.status;
        this.currentQuestionNum = 0;
        this.answers = [];
    }
}

PollModel.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    polls: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        answers: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired
    })).isRequired,
    currentQuestionNum: PropTypes.number
};

PollModel.defaultProps = {
    name: '',
    description: '',
    author: '',
    answers: []
};
