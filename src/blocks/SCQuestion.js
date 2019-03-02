import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '@vkontakte/vkui';

class SCQuestion extends React.Component {
    render() {
        return (
            <Header>{this.props.num + 1}. {this.props.question}</Header>
        );
    }
}

SCQuestion.propTypes = {
    question: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired
};

export default SCQuestion;
