import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@vkontakte/vkui';

class SCAlert extends React.Component {
    render() {
        return (
            <Alert
                actionsLayout="vertical"
                actions={[{
                    title: 'Спасибо',
                    autoclose: true,
                    style: 'cancel'
                }]}
                onClose={this.props.closePopout}
            >
                <h2>Спасибо за прохождение опроса!</h2>
                <p>Вам начислены баллы.</p>
            </Alert>
        );
    }
}

SCAlert.propTypes = {

};

export default SCAlert;
