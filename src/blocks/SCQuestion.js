import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '@vkontakte/vkui';

class SCQuestion extends React.Component {
    render() {
        return (
            <div>
                <Header level="2">Вопрос {this.props.num + 1}/{this.props.questionsAmount}</Header>
                <Header>{this.props.question}</Header>
            </div>
        );
    }
}

SCQuestion.propTypes = {
    question: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired
};

export default SCQuestion;
