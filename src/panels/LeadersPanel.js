import React from 'react';
import { Panel } from '@vkontakte/vkui';
import {Cell, Group, HeaderContext, List, PanelHeader, PanelHeaderContent, Avatar} from '@vkontakte/vkui';
import connect from "react-redux/es/connect/connect";
import SCCoin from "../blocks/SCCoin";


export class LeadersPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel id="leaders">
                <PanelHeader>
                   Топ игроков
                </PanelHeader>

                <Group title={"Лучшие игроки"}>
                    <List >
                        {this.makeCells(this.props.leaders.leaders)}
                    </List>
                </Group>
            </Panel>
        );
    }

    makeCells = (leaders) => {
        return leaders.map((leader, i) => {
            return (
                <Cell
                      href={`https://vk.com/id${leader.id}`}
                      key={i}
                      before={<Avatar size={56} src={leader.img || "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"}/>}
                      asideContent={<SCCoin quantity={leader.balance || 0}/>}
                >
                   {leader.id}
                </Cell>
            )
        });
    }
}

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    };
};


export default connect(mapStateToProps)(LeadersPanel);
