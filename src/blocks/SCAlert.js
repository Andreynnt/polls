import React from 'react';
import { Alert } from '@vkontakte/vkui';
import SCGiftIcon from "./icons/SCGiftIcon";


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
                <h2>Опрос пройден!</h2>
                <SCGiftIcon/>
                <p>Скоро вам будут начислены баллы.</p>
            </Alert>
        );
    }
}

export default SCAlert;
