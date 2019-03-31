import React from 'react';
import { Panel } from '@vkontakte/vkui';
import {Cell, Group, HeaderContext, List, PanelHeader, PanelHeaderContent, Avatar} from '@vkontakte/vkui';


export default class LeadersPanel extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperStyle = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "95vw",
            marginTop: "5px",
            marginBottom: "5px"
        };
        this.centerWrapperStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        };

        this.avatarUrls = [
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg",
            "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"
        ]
    }

    render() {
        return (
            <Panel id="leaders">
                <PanelHeader>
                   Топ игроков
                </PanelHeader>

                <Group title={"Лучшие игроки"}>
                    <List >
                        {this.makeCells(this.avatarUrls)}
                    </List>
                </Group>
            </Panel>
        );
    }

    makeCells = (urls) => {
        const lastCellPhotosAmount = urls.length % 4;
        const groupsAmount = (urls.length - lastCellPhotosAmount) / 4;

        let cells = [];
        for (let i = 0; i <= groupsAmount; i++) {
            let avatars = [];
            for (let j = 0; j < 4; j++) {
                if (i === groupsAmount && j === lastCellPhotosAmount) {
                    break;
                }
                avatars.push(<Avatar src={urls[i * 4 + j]} size={80}/>)
            }
            cells.push(<Cell>
                            <div style={this.centerWrapperStyle}>
                                <div style={this.wrapperStyle}>
                                    {avatars}
                                </div>
                            </div>
                        </Cell>
            )
        }

        return cells;
    }
}