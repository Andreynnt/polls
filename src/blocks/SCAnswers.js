import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from '@vkontakte/vkui';

class SCAnswers extends React.Component {
    render() {
        return (
            this.props.answers.map((text, i) =>
                <Radio name="radio" value={i}>{text}</Radio>
            )
        );
    }
}

SCAnswers.propTypes = {
    answers: PropTypes.array.isRequired
}

export default SCAnswers;
