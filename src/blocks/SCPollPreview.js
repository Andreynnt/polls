import React from 'react';
import PropTypes from 'prop-types';
import {Button, Group, Div} from "@vkontakte/vkui";
import * as AppService from "../services/AppService";


class SCPollPreview extends React.Component {
    render() {
        const imageWrapper = {
            height: "40vh",
            borderRadius: "12px",
            backgroundImage: "url(" + AppService.shared().pathToImages() + "pug2.jpg" + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%"
        };

        let button = this.props.pollIsDone ? null : (<Div><Button level="commerce" onClick={() => this.props.runTest()} size="xl">{"Начать"}</Button></Div>);

        return (
            <div>
                <Group title={this.props.model.name} description={"Вопросов: " + String(this.props.model.polls.length) + ", автор: " + String(this.props.model.author)}>
                    <Div>
                        {this.props.model.description}
                    </Div>

                    <Div>
                        <div style={imageWrapper}>

                        </div>
                    </Div>
                </Group>
                {button}
            </div>
        )
    }
}

SCPollPreview.propTypes = {
    runTest: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
    pollIsDone: PropTypes.bool.isRequired
};

export default SCPollPreview;
