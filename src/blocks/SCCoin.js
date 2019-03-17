import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from "@vkontakte/vkui/";
import * as AppService from "../services/AppService";

class SCCoin extends React.Component {
    constructor(props) {
        super(props);
        this.customStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    }

    render() {
        return (
            <div style={this.customStyle}>
                <div style={{margin: '2px'}}>{this.props.quantity}</div>
                <Avatar src={AppService.shared().pathToImages() + 'icons8-expensive-96.png'}
                        style={{ background: 'var(--control_tint)' }}
                        size={28}
                />
            </div>
        );
    }
}

SCCoin.propTypes = {
    quantity: PropTypes.number.isRequired
};

export default SCCoin;
