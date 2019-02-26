import PropTypes from 'prop-types';

export default class PollModel {
    constructor({title, author}) {
        this.title = title;
        this.author = author;
    }
}

PollModel.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string
};

PollModel.defaultProps = {
    title: '',
    author: ''
};
