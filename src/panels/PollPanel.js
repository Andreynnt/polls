import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Button, HeaderButton, platform, IOS, FormLayout, Div} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import SCAnswers from "../blocks/SCAnswers";
import SCQuestion from "../blocks/SCQuestion";
import SCAlert from "../blocks/SCAlert";
import connect from "react-redux/es/connect/connect";

const osname = platform();

export class PollPanel extends React.Component {
    render() {
        const questionNum  = this.props.navigation.selectedPoll.currentQuestionNum;
        const questionWithAnswers = this.props.navigation.selectedPoll.polls[questionNum];
        const questionAndAnswers = (
            <Group>
                <SCQuestion question={questionWithAnswers.question} num={questionNum}/>
                <FormLayout>
                    <SCAnswers answers={questionWithAnswers.answers}/>
                </FormLayout>
             </Group>
        );

        let action = () => this.props.answerQuestion(this.props.navigation.selectedPollNum);
        if (questionNum === this.props.navigation.selectedPoll.polls.length - 1) {
            action = () => { this.props.showPopout(<SCAlert/>) }
        }


        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<HeaderButton onClick={this.props.changeActivePanel}
                                                 data-to="polls">
                                        {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                                  </HeaderButton>}>
                    {this.props.navigation.selectedPoll.author}
                </PanelHeader>

                {questionAndAnswers}

                <Div style={{background: "#ebedf0"}}>
                    <Button onClick={action}
                            size="xl"
                            data-to="polls">
                        Ответить
                    </Button>
                </Div>
            </Panel>
        );
    }
}

PollPanel.propTypes = {
    id: PropTypes.string.isRequired,
    changeActivePanel: PropTypes.func.isRequired,
    selectedPoll: PropTypes.PropTypes.object
};

const mapStateToProps = state => {
    return {
        navigation: state.navigation,
        models: state.models
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showPopout: (alert) => {
            dispatch({ type: "RETURN_AND_SHOW_POPOUT", payload: alert})
        },
        changeActivePanel: (e) => {
            dispatch({ type: "CHANGE_PANEL", payload: e.currentTarget.dataset.to })
        },
        answerQuestion: (pollNum) => {
            dispatch({ type: "USER_ANSWERED", pollNum: pollNum })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PollPanel);
