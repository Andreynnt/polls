import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Cell, Avatar } from '@vkontakte/vkui';
import SCCoin from "../blocks/SCCoin";
import * as AppService from "../services/AppService";
import connect from "react-redux/es/connect/connect";


export class ProfilePanel extends React.Component {
    render() {
        let infoText = "Информация";
        let coins = 0;

        if (this.props.user && this.props.user.user) {
            if (this.props.user.user.first_name) {
                infoText = `Привет, ${this.props.user.user.first_name}!`;
            }
            coins = this.props.user.user.balance;
        }

        return (
            <Panel id={this.props.id}>
                <PanelHeader>Профиль</PanelHeader>
                <Group title="Достижения">
                    <Cell before={<Avatar src= {AppService.shared().pathToImages() + "icons8-money-bag-100.png"}
                                          style={{ background: 'var(--control_tint)' }}
                                          size={56}/>}
                          asideContent={<SCCoin quantity={coins}/>}
                          description="Их можно менять на деньги">Ваши монеты</Cell>

                    <Cell before={<Avatar src= {AppService.shared().pathToImages() + "icons8-crown.png"}
                                          style={{ background: 'var(--control_tint)' }}
                                          size={56}/>}
                          description="Разработчки трудятся над приложением">{infoText}</Cell>
                </Group>
            </Panel>
        );
    }
}

ProfilePanel.propTypes = {
    id: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(ProfilePanel);