import PropTypes from 'prop-types';

export default class PollModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.author = data.author;
        this.polls = data.polls;
        this.passed = data.passed;
    }
}

PollModel.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    passed: PropTypes.bool.isRequired,
    polls: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        answers: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired
    })).isRequired
};

PollModel.defaultProps = {
    name: '',
    description: '',
    author: ''
};
