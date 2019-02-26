import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Cell } from '@vkontakte/vkui';
import PollModel from "../models/PollModel";
import SCList from "../blocks/SCList";


export default class Polls extends React.Component {
    makeModels() {
        return [
            new PollModel({title: "Любимая порода собак", author: "Лентач"}),
            new PollModel({title: "Трек года", author: "VKmusic"}),
            new PollModel({title: "Баста VS Гуф", author: "Рифмы и панчи"}),
            new PollModel({title: "Лучший блогер 2018", author: "Лентач"}),
            new PollModel({title: "Человек года по версии GQ", author: "GQ"})
        ];
    }

    render() {
        const models = this.makeModels();
        let cells = models.map(item =>
            <Cell description={item.author}>{item.title}</Cell>
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
    id: PropTypes.string.isRequired
};
