import React from 'react';
import { Alert } from '@vkontakte/vkui';
import SCGiftIcon from "./icons/SCGiftIcon";
import connect from "react-redux/es/connect/connect";
import SCCoin from "../blocks/SCCoin";


export class SCAlert extends React.Component {
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
                <p>Вам начислена одна монета!</p>
            </Alert>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closePopout: () => {
            dispatch({ type: "CLOSE_POPOUT" })
        }
    }
};

export default connect(null, mapDispatchToProps)(SCAlert);
