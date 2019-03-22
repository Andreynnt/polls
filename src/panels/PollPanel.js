import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Button, HeaderButton, platform, IOS, FormLayout, Div, Radio, Input, Cell, FormStatus} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import SCQuestion from "../blocks/SCQuestion";
import SCAlert from "../blocks/SCAlert";
import connect from "react-redux/es/connect/connect";
import * as ReactDOM from "react-dom";

const osname = platform();
const defaultAnswer = "Asasa2211+A-+Aa_12±!@#";

export class PollPanel extends React.Component {
    constructor(props) {
        super(props);
        this.answer = defaultAnswer;
        this.isAnswered = false;
        this.onChange = this.onChange.bind(this);
        this.onChangeOpen = this.onChange.bind(this);
        this.onChangeWithRemoveRadio = this.onChangeWithRemoveRadio.bind(this);
        this.state = {needError: false}
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
                return <Cell onClick={() => this.clickSelectableCell(i)} name="radio" key={i} value={i} selectable>{text}</Cell>
                }
            );
            const input = questionWithAnswers.other === "true" ? <Input onChange={this.onChangeWithRemoveRadio} className={"myInputForClear"} placeholder="Ваш ответ" /> : null;
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

        const questionNum = this.props.navigation.selectedPoll.currentQuestionNum;
        const questionWithAnswers = this.props.navigation.selectedPoll.polls[questionNum];
        const answers = this.renderAnswers(questionWithAnswers);
        const errorBlock = this.state.needError ? <FormStatus state="error">Необходимо ответить на вопрос</FormStatus> : null;

        const questionAndAnswers = (
            <Group>
                <SCQuestion question={questionWithAnswers.question} num={questionNum} questionsAmount={this.props.navigation.selectedPoll.polls.length}/>
                <FormLayout>
                    {answers}
                    {errorBlock}
                </FormLayout>
            </Group>
        );

        let action = () => this.props.answerQuestion(this.props.navigation.selectedPollNum, this.answer);
        if (questionNum === this.props.navigation.selectedPoll.polls.length - 1) {
            action = () => {
                let userId = 0;
                if (this.props.user && this.props.user.user) {
                    userId = this.props.user.user.id ? this.props.user.user.id : 0;
                }
                this.props.plusOneCoinToUser();
                this.props.sendAnswers(this.props.navigation.selectedPollNum, this.answer, userId);
                this.props.showPopout(<SCAlert/>);
            }
        }

        return (
            <Panel id={this.props.id} ref={node => this._ref = node}>
                <PanelHeader left={<HeaderButton onClick={this.props.changeActivePanel}
                                                 data-to="polls">
                                        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                                  </HeaderButton>}>
                    {this.props.navigation.selectedPoll.author}
                </PanelHeader>

                {questionAndAnswers}

                <Div style={{background: "#ebedf0"}}>
                    <Button onClick={() => {
                                 if (this.isAnswered) {
                                     action();
                                     this.answer = defaultAnswer;
                                     this.removeRadioChecked();
                                     this.removeInput();
                                     this.isAnswered = false;
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
                        Ответить
                    </Button>
                </Div>
            </Panel>
        );
    }

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

    clickRadio = (i) => {
        this.answer = i;
        this.isAnswered = true;
    };

    onChange(e) {
        this.answer = "other: " + e.currentTarget.value;
        this.isAnswered = true;
    };

    onChangeOpen(e) {
        this.answer = e.currentTarget.value;
        this.isAnswered = true;
    }

    onChangeWithRemoveRadio(e) {
        this.removeRadioChecked();
        this.onChange(e);
        this.isAnswered = true;
    }

    clickSelectableCell = (i) => {
        if (this.answer === defaultAnswer) {
            this.answer = [];
            this.answer.push(i);
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
        sendAnswers: (pollNum, lastAnswer, userId) => {
            dispatch({ type: "SEND_ANSWERS", pollNum: pollNum, lastAnswer: lastAnswer, userId:userId})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PollPanel);
