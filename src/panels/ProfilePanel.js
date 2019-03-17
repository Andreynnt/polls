import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Cell, Avatar } from '@vkontakte/vkui';
import SCCoin from "../blocks/SCCoin";
import * as AppService from "../services/AppService";

export default class ProfilePanel extends React.Component {
    render() {

        let title = this.props.user ? this.props.user.first_name : "Профиль";

        return (
            <Panel id={this.props.id}>
                <PanelHeader>{title}</PanelHeader>
                <Group title="Достижения">
                    <Cell before={<Avatar src= {AppService.shared().pathToImages() + "icons8-money-bag-100.png"}
                                          style={{ background: 'var(--control_tint)' }}
                                          size={56}/>}
                          asideContent={<SCCoin quantity={121}/>}
                          description="Их можно менять на деньги">Ваши монеты</Cell>
                </Group>
            </Panel>
        );
    }
}

ProfilePanel.propTypes = {
    id: PropTypes.string.isRequired
};