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

export class Poll extends React.Component {
    render() {
        const questionAndAnswers = this.props.navigation.selectedPoll.polls.map((item, i) =>
                <Group key={i}>
                    <SCQuestion question={item.question} num={i}/>
                    <FormLayout>
                        <SCAnswers answers={item.answers}/>
                    </FormLayout>
                </Group>
        );

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
                    <Button onClick={() => this.props.showPopout(<SCAlert/>)}
                            size="xl"
                            data-to="polls">
                        Отправить
                    </Button>
                </Div>
            </Panel>
        );
    }
}

Poll.propTypes = {
    id: PropTypes.string.isRequired,
    changeActivePanel: PropTypes.func.isRequired,
    selectedPoll: PropTypes.PropTypes.object
};

const mapStateToProps = state => {
    return {
        navigation: state.navigation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showPopout: (alert) => {
            dispatch({ type: "RETURN_AND_SHOW_POPOUT", payload: alert})
        },
        changeActivePanel: (e) => {
            dispatch({ type: "CHANGE_PANEL", payload: e.currentTarget.dataset.to })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
