import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Cell, Avatar } from '@vkontakte/vkui';
import SCCoin from "../blocks/SCCoin";


export default class ProfilePanel extends React.Component {
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader>Профиль</PanelHeader>
                <Group title="Достижения">
                    <Cell before={<Avatar src="../../img/icons8-money-bag-100.png"
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
