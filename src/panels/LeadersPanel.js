import React from 'react';
import { Panel } from '@vkontakte/vkui';
import {Cell, Group, List, PanelHeader, Avatar, PullToRefresh} from '@vkontakte/vkui';
import connect from "react-redux/es/connect/connect";
import SCCoin from "../blocks/SCCoin";
import HttpService from "../services/HttpService";

export class LeadersPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false
        };

        this.onRefresh = () => {
            this.setState({ fetching: true });
            HttpService.getLeaders((models, error) => {
                    if (error) {
                        console.log("error", error);
                        this.setState({ fetching: false });
                        return;
                    }
                    this.props.gotLeaders(models);
                    this.setState({ fetching: false });
                }
            );
        };
    }

    render() {
        return (
            <Panel id="leaders">
                <PanelHeader>
                   Топ игроков
                </PanelHeader>

                <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
                    <Group title={"Лучшие игроки"}>
                        <List >
                            {this.makeCells(this.props.leaders.leaders)}
                        </List>
                    </Group>
                </PullToRefresh>
            </Panel>
        );
    }

    makeCells = (leaders) => {
        return leaders.map((leader, i) => {
            return (
                <Cell
                      href={`https://vk.com/id${leader.id}`}
                      key={i}
                      before={<Avatar size={56} src={leader.photo_100 || "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"}/>}
                      asideContent={<SCCoin quantity={leader.balance || 0}/>}
                >
                   {leader.first_name + " " + leader.last_name}
                </Cell>
            )
        });
    };

}

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        gotLeaders: (models) => {
            dispatch({ type: "GOT_LEADERS_FROM_BACKEND", leaders: models})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadersPanel);
