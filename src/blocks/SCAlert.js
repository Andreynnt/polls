import React from 'react';
import { Alert } from '@vkontakte/vkui';
import SCGiftIcon from "./icons/SCGiftIcon";
import connect from "react-redux/es/connect/connect";


export class SCAlert extends React.Component {
    constructor(props) {
        super(props);
        this.centerStyle = {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        };
        this.elementCenter = {
            alignSelf: "center"
        }
    }


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
                <div style={this.centerStyle}>
                    <h2 style={this.elementCenter}>Опрос пройден!</h2>
                    <SCGiftIcon/>
                    <p style={this.elementCenter}>Вам начислена одна монета!</p>
                </div>
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
