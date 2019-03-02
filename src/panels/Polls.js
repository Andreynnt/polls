import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Cell } from '@vkontakte/vkui';
import PollModel from "../models/PollModel";
import SCList from "../blocks/SCList";



export default class Polls extends React.Component {
    render() {
        let cells = this.props.pollModels.map((item, i) =>
            <Cell key={i}
                  description={item.author}
                  onClick={() => this.props.selectCell(item)}
                  data-to="poll"
                  expandable>
                {item.name}

            </Cell>
        );
        return (
            <Panel id={this.props.id}>
                <PanelHeader>Опросы</PanelHeader>
                <Group title="Новые">
                    <SCList cells={cells}/>
                </Group>
                <Group title="Пройденные">
                    <SCList cells={cells}/>
                </Group>
            </Panel>
        );
    }
}

Polls.propTypes = {
    id: PropTypes.string.isRequired,
    changeActiveStory: PropTypes.func.isRequired,
    selectCell: PropTypes.func.isRequired,
};
