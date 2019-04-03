import React from 'react';
import { Panel } from '@vkontakte/vkui';
import {Cell, Group, HeaderContext, List, PanelHeader, PanelHeaderContent, Avatar} from '@vkontakte/vkui';
import connect from "react-redux/es/connect/connect";


export class LeadersPanel extends React.Component {
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

        // this.avatarUrls = [
        //     {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: "https://vk.com/andreibabkov"},
        //     {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: "https://vk.com/andreibabkov"},
        //     {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: "https://vk.com/andreibabkov"},
        //     {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: "https://vk.com/andreibabkov"},
        //     {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: "https://vk.com/andreibabkov"},
        //     {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: "https://vk.com/andreibabkov"},
        //     {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: "https://vk.com/andreibabkov"},
        //     {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: "https://vk.com/andreibabkov"},
        //     {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: "https://vk.com/andreibabkov"},
        //     {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: "https://vk.com/andreibabkov"}
        // ];

        this.avatarUrls = this.props.leaders.leaders.map(item => {
            return {img: "https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg", href: `https://vk.com/id${item.id}`}
        });
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
                avatars.push(<a href={urls[i * 4 + j].href}><Avatar src={urls[i * 4 + j].img} size={80}/></a>)
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

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    };
};


export default connect(mapStateToProps)(LeadersPanel);
