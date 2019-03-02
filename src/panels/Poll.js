import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Cell, Button, HeaderButton, platform, IOS, FormLayout, Div} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import SCAnswers from "../blocks/SCAnswers";
import SCQuestion from "../blocks/SCQuestion";
import SCAlert from "../blocks/SCAlert";

const osname = platform();

export default class Poll extends React.Component {
    render() {
        const questionAndAnswers = this.props.model.polls.map((item, i) =>
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
                    {this.props.model.author}
                </PanelHeader>
                {questionAndAnswers}

                <Div style={{background: "#ebedf0"}}>
                    <Button onClick={() => this.props.showPopout(<SCAlert closePopout={this.props.closePopout}/>)} size="xl" data-to="polls">Отправить</Button>
                </Div>

            </Panel>
        );
    }

}

Poll.propTypes = {
    id: PropTypes.string.isRequired,
    changeActiveStory: PropTypes.func.isRequired,
    changeActivePanel: PropTypes.func.isRequired,
    showPopout: PropTypes.func.isRequired,
    closePopout: PropTypes.func.isRequired,
    model: PropTypes.PropTypes.object,
};