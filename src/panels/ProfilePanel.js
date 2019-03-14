import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Cell } from '@vkontakte/vkui';


export default class ProfilePanel extends React.Component {
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader>Профиль</PanelHeader>
                <Group title="Твой профиль">
                    <Cell>Пока тут ничего нет</Cell>
                </Group>
            </Panel>
        );
    }
}

ProfilePanel.propTypes = {
    id: PropTypes.string.isRequired
};
