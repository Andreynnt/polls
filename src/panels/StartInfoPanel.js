import React from "react";
import {Panel, Button, Group, Div} from '@vkontakte/vkui';
import connect from "react-redux/es/connect/connect";
import * as AppService from "../services/AppService";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../src/css/sliderSlide.css";

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

        const sliderImage = {
            display: "block",
            maxHeight: "50vh",
            width: "auto",
            height: "auto"
        };

        const buttonStyle = {
            marginTop: "30px"
        };

        const sliderTitle = {
            fontSize: "20px",
            fontWeight: "bolder",
            marginTop: "50px",
            marginBottom: "30px",
        };

        const sliderText = {
            fontSize: "15px",
            marginTop: "30px",
            marginBottom: "40px",
        };

        const sliderWrapper = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        };

        return (
            <Panel id={this.props.id}>
                <Div>
                    <Carousel showThumbs={false} showStatus={false}>
                        <div style={sliderWrapper}>
                            <div style={sliderTitle}>Проходи опросы</div>
                            <img style={sliderImage} src={AppService.shared().pathToImages() + "iphone7-2.png"} />
                            <div style={sliderText}>Проходи социологические исследования</div>
                        </div>
                        <div style={sliderWrapper}>
                            <div style={sliderTitle}>Зарабатывай монеты</div>
                            <img style={sliderImage} src={AppService.shared().pathToImages() + "iphone7-1.png"} />
                            <div style={sliderText}>Поднмайся в таблице лидеров</div>
                        </div>
                        <div style={sliderWrapper}>
                            <div style={sliderTitle}>Создавай опросы</div>
                            <img style={sliderImage} src={AppService.shared().pathToImages() + "leming2.png"} />
                            <div style={sliderText}>Создавай опросы на johnylemming.ru</div>
                        </div>
                    </Carousel>

                    <Button style={buttonStyle} size="xl" level="commerce" onClick={() => {this.props.openApp(); this.props.loadAction();}}>Открыть приложение</Button>
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