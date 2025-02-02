import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Button, HeaderButton, platform, IOS, FormLayout, Div, Radio, Input, FormStatus, FormLayoutGroup, Checkbox} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import SCQuestion from "../blocks/SCQuestion";
import SCAlert from "../blocks/SCAlert";
import connect from "react-redux/es/connect/connect";
import * as ReactDOM from "react-dom";
import SCPollPreview from "../blocks/SCPollPreview";
import SCChart from "../blocks/SCChart";
import HttpService from "../services/HttpService";

const osname = platform();
const defaultAnswer = "Asasa2211+A-+Aa_12±!@#";

export class PollPanel extends React.Component {
    constructor(props) {
        super(props);
        this.answer = defaultAnswer;
        this.userGotTextInOtherField = false;
        this.isAnswered = false;
        this.onChange = this.onChange.bind(this);
        this.onChangeOpen = this.onChange.bind(this);
        this.onChangeWithRemoveRadio = this.onChangeWithRemoveRadio.bind(this);
        this.onChangeWithRemoveCell = this.onChangeWithRemoveCell.bind(this);
        this.state = {needError: false, needPreviewPage: true, isWatchingAnsweredPoll: false};
    }

    renderAnswers(questionWithAnswers) {
        let answers = [];

        if (questionWithAnswers.type === "one") {
            const radios = questionWithAnswers.answers.map((text, i) => {
                    return <Radio onClick={() => this.clickRadio(i)} name="radio" key={i} value={i}>{text}</Radio>
                }
            );
            const input = questionWithAnswers.other === "true" ? <Input onChange={this.onChangeWithRemoveRadio} placeholder="Ваш ответ" /> : null;
            return <div>
                {radios}
                {input}
            </div>

        } else if (questionWithAnswers.type === "multi") {
            const radios = questionWithAnswers.answers.map((text, i) => {
                return <Checkbox onClick={() => this.clickSelectableCell(i)} key={i} value={i}>{text}</Checkbox>
                }
            );
            const input = questionWithAnswers.other === "true" ? <Input onChange={this.onChangeWithRemoveCell} className={"myInputForClear"} placeholder="Ваш ответ" /> : null;
            return <div>
                {radios}
                {input}
            </div>

        } else if (questionWithAnswers.type === "open") {
            answers = <Input top="Ваш ответ" className={"myInputForClear"} onChange={this.onChangeOpen}/>
        }

        return answers
    }

    render() {

        //настройка превью
        if ((this.state.needPreviewPage || this.props.navigation.selectedPoll.status === "done") && !this.state.isWatchingAnsweredPoll) {
            let actionForPreviewButton = () => {};
            let pollIsDone = this.props.navigation.selectedPoll.status === "done";
            if (this.props.navigation.selectedPoll.status === "done") {
                //нажимаем посмотреть результаты в пройденном опросе
                actionForPreviewButton = () => {
                    this.getResult(this.props.navigation.selectedPoll.id, (data) => {
                        this.props.gotPollResultFromBackend(data);
                        this.setState({...this.state, needPreviewPage: false, isWatchingAnsweredPoll: true})
                    });
                }
            } else  {
                actionForPreviewButton = () => { this.setState({...this.state, needPreviewPage: false })}
            }

            return (
                <Panel id={this.props.id} ref={node => this._ref = node}>
                    <PanelHeader left={<HeaderButton onClick={this.props.changeActivePanel}
                                                     data-to="polls">
                        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </HeaderButton>}>
                        {this.props.navigation.selectedPoll.status === "done" ? "Просмотр результатов" : "Прохождение опроса"}
                    </PanelHeader>
                    <SCPollPreview model={this.props.navigation.selectedPoll} runTest={() => actionForPreviewButton()} pollIsDone={pollIsDone}/>
                </Panel>
            )
        }

        return (
            <Panel id={this.props.id} ref={node => this._ref = node}>
                <PanelHeader left={<HeaderButton onClick={this.props.changeActivePanel}
                                                 data-to="polls">
                                        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                                  </HeaderButton>}>
                    {this.props.navigation.selectedPoll.status === "done" ? "Просмотр результатов" : "Прохождение опроса"}
                </PanelHeader>

                {this.state.isWatchingAnsweredPoll ? this.getChart() : this.getQuestionsWithAnswers()}

                <Div>
                    <Button onClick={() => {
                                 if (this.state.isWatchingAnsweredPoll) {
                                     this.getActionForAnsweredPoll()();
                                 } else if (this.isAnswered) {
                                     this.getActionForAnswer()();
                                     this.answer = defaultAnswer;
                                     this.removeRadioChecked();
                                     this.removeInput();
                                     this.isAnswered = false;
                                     this.userGotTextInOtherField = false;
                                     this.setState({
                                         ...this.state,
                                         needError: false
                                     })
                                 } else {
                                     this.setState({
                                         ...this.state,
                                         needError: true
                                     })
                                 }
                            }}
                            size="xl"
                            data-to="polls">
                        {this.state.isWatchingAnsweredPoll ? "Далее" : "Ответить"}
                    </Button>
                </Div>
            </Panel>
        );
    }

    getActionForAnswer = () => {
        const questionNum = this.props.navigation.selectedPoll.currentQuestionNum;
        let action = () => this.props.answerQuestion(this.props.navigation.selectedPollNum, this.answer);
        if (questionNum === this.props.navigation.selectedPoll.polls.length - 1) {
            action = () => {
                let userId = 0;
                if (this.props.user && this.props.user.user) {
                    userId = this.props.user.user.id ? this.props.user.user.id : 0;
                }
                this.props.plusOneCoinToUser();
                this.props.sendAnswers(this.props.navigation.selectedPollNum, this.answer, userId);
                this.props.navigation.selectedPoll.currentQuestionNum = 0;
                this.props.showPopout(<SCAlert/>);
            }
        }
        return action;
    };

    getActionForAnsweredPoll = () => {
        const questionNum = this.props.navigation.selectedPoll.currentQuestionNum;
        let action = () => this.props.watchNextAnswer(this.props.navigation.selectedPollNum);
        if (questionNum === this.props.navigation.selectedPollResult.questions.length - 1) {
            action = () => {
                this.props.navigation.selectedPoll.currentQuestionNum = 0;
                this.props.goBackToPolls();
            }
        }
        return action;
    };


    getQuestionsWithAnswers = () => {
        const questionNum = this.props.navigation.selectedPoll.currentQuestionNum;
        const questionWithAnswers = this.props.navigation.selectedPoll.polls[questionNum];
        const answers = this.renderAnswers(questionWithAnswers);
        const errorBlock = this.state.needError ? <FormStatus state="error">Необходимо ответить на вопрос</FormStatus> : null;

        return (
            <Group>
                <SCQuestion question={questionWithAnswers.question} num={questionNum} questionsAmount={this.props.navigation.selectedPoll.polls.length}/>
                <FormLayout>
                    <FormLayoutGroup>
                        {answers}
                        {errorBlock}
                    </FormLayoutGroup>
                </FormLayout>
            </Group>
        );
    };

    getChart = () => {
        const questionNum = this.props.navigation.selectedPoll.currentQuestionNum;
        const selectedResult = this.props.navigation.selectedPollResult.questions[questionNum];
        return (
            <Group>
                <SCQuestion question={selectedResult.name} num={questionNum} questionsAmount={this.props.navigation.selectedPollResult.questions.length}/>
                <SCChart questionWithAnswers={selectedResult}/>
            </Group>
        )
    };

    getResult = (id, callback) => {
        HttpService.getPollResult(id, (data, error) => {
            if (error) {
                console.error("getPollResult error", error);
                return;
            }
            console.log("getResult() success");
            callback(data);
        });
    };


    removeRadioChecked() {
        const radiosCollection = ReactDOM.findDOMNode(this._ref).getElementsByClassName('Radio__input');
        [].slice.call(radiosCollection).forEach(radio => {
            radio.checked = false;
        });
    }

    removeInput() {
        const inputCollection = ReactDOM.findDOMNode(this._ref).getElementsByClassName('Input__el');
        [].slice.call(inputCollection).forEach(input => {
            input.value = "";
        });
    }

    removeCellCheck() {
        const inputCollection = ReactDOM.findDOMNode(this._ref).getElementsByClassName("Checkbox__input");
        [].slice.call(inputCollection).forEach(cell => {
            cell.checked = false;
        });
    }

    clickRadio = (i) => {
        this.removeInput();
        this.isAnswered = true;
        this.answer = i;
    };

    onChange(e) {
        if (e.currentTarget.value === "") {
            this.userGotTextInOtherField = false;
            this.isAnswered = false;
            this.answer = defaultAnswer;
            return;
        }
        this.userGotTextInOtherField = true;
        this.answer = "other: " + e.currentTarget.value;
        this.isAnswered = true;
    };

    onChangeOpen(e) {
        this.answer = e.currentTarget.value;
        this.isAnswered = true;
    }

    onChangeWithRemoveRadio(e) {
        this.removeRadioChecked();
        this.isAnswered = true;
        this.onChange(e);
    }

    onChangeWithRemoveCell(e) {
        this.removeCellCheck();
        this.userGotTextInOtherField = true;
        this.isAnswered = true;
        this.onChange(e);
    }

    clickSelectableCell = (i) => {
        if (this.answer === defaultAnswer || this.userGotTextInOtherField) {
            this.answer = [];
            this.answer.push(i);
            this.removeInput();
            this.userGotTextInOtherField = false;
        } else {
            const index = this.answer.indexOf(i);
            if (index > -1) {
                this.answer.splice(index, 1);
            } else {
                this.answer.push(i);
            }
        }
        this.isAnswered = true;
    }

}

PollPanel.propTypes = {
    id: PropTypes.string.isRequired,
    changeActivePanel: PropTypes.func.isRequired,
    selectedPoll: PropTypes.PropTypes.object,
};

const mapStateToProps = state => {
    return {
        navigation: state.navigation,
        models: state.models,
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showPopout: (alert) => {
            dispatch({ type: "RETURN_AND_SHOW_POPOUT", payload: alert})
        },
        plusOneCoinToUser: () => {
            dispatch({ type: "PLUS_ONE_COIN" })
        },
        changeActivePanel: (e) => {
            dispatch({ type: "CHANGE_PANEL", payload: e.currentTarget.dataset.to })
        },
        answerQuestion: (pollNum, answer) => {
            dispatch({ type: "USER_ANSWERED", pollNum: pollNum, answer: answer})
        },
        watchNextAnswer: (pollNum) => {
            dispatch({ type: "WATCH_NEXT_ANSWER", pollNum: pollNum})
        },
        sendAnswers: (pollNum, lastAnswer, userId) => {
            dispatch({ type: "SEND_ANSWERS", pollNum: pollNum, lastAnswer: lastAnswer, userId:userId})
        },
        goBackToPolls: () => {
            dispatch({ type: "RETURN_TO_POLLS"})
        },
        gotPollResultFromBackend: (result) => {
            dispatch({ type: "GOT_POLL_RESULT_FROM_BACKEND", result: result})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PollPanel);
