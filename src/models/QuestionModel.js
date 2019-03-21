import PropTypes from 'prop-types';

export default class QuestionModel {
    constructor(data) {
        this.id = data.id || "0";
        this.question = data.name;
        this.type = data.type;
        this.answers = data.answers;
        this.other = data.other || false;
    }
}

QuestionModel.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    other: PropTypes.bool.isRequired
};
