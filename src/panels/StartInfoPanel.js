import React from "react";
import {Panel, Button, Group, Div} from '@vkontakte/vkui';
import connect from "react-redux/es/connect/connect";
import * as AppService from "../services/AppService";


class StartInfoPanel extends React.Component {
    render() {
        const text = `
            Привет! Это приложение сделано для того, чтобы помочь проводить социологические исследования на аудитории VK.
            Здесь ты можешь проходить опросы, посмотреть свои пройденные опросы и увидеть себя в рейтинге игроков.
            Пройди опрос и получи первые монеты. Также ты можешь создать свой опрос на сайте johnylemming.ru и посмотреть ответы
            пользователей VK.
        `;

        const title = `
          VKPolls
        `;

        const imgStyle = {
            width: "47vw"
        };

        const divStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100vh",
            background: "linear-gradient(90deg, rgba(0,221,201,1) 38%, rgba(0,212,255,0.8449754901960784) 100%)"
        };

        const textWrapper = {
            marginBottom: "10vh",
            color: "white",
            marginTop: "4vh"
        };

        const titleTextWrapper = {
            color: "white",
            fontSize: "25px",
            fontWeight: "bold"
        };

        return (
            <Panel id={this.props.id}>
                <Div style={divStyle}>
                    <img style={imgStyle} src={AppService.shared().pathToImages() + "pollsWhite.png"} alt={"d"}/>
                    <div style={titleTextWrapper}>{title}</div>
                    <div style={textWrapper}>{text}</div>
                    <Button size="xl" level="secondary" onClick={() => {this.props.openApp(); this.props.loadAction();}}>Открыть приложение</Button>
                </Div>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        navigation: state.navigation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openApp: () => {
            dispatch({ type: "CHANGE_STORY_AND_PANEL", payload: {story: "preloader", panel: "preloader"}})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartInfoPanel);