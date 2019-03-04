import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Cell, PanelHeaderContent, HeaderContext, List } from '@vkontakte/vkui';
import SCList from "../blocks/SCList";
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon16Fire from '@vkontakte/icons/dist/16/fire';
import Icon16CheckCircleOutline from '@vkontakte/icons/dist/16/check_circle_outline';


export default class Polls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contextOpened: false,
            mode: props.mode
        };
    }

    render() {
        let cells = this.props.pollModels.map((item, i) => {
                if ((item.passed && this.state.mode === 'passed') || ((!item.passed && this.state.mode === 'new'))) {
                    return <Cell key={i}
                                 description={item.author}
                                 onClick={() => this.props.selectCell(item)}
                                 data-to="poll"
                                 expandable>
                        {item.name}
                    </Cell>
                }
            }
        );

        const title = this.state.mode === 'new' ? "Новые" : "Пройденные";

        return (
            <Panel id={this.props.id}>
                <PanelHeader>
                    <PanelHeaderContent aside={<Icon16Dropdown />} onClick={this.toggleContext}>
                        {title}
                    </PanelHeaderContent>
                </PanelHeader>
                <HeaderContext opened={this.state.contextOpened} onClose={this.toggleContext}>
                    <List>
                        <Cell
                            before={<Icon16Fire />}
                            asideContent={this.state.mode === 'new' ? <Icon24Done fill="var(--accent)" /> : null}
                            onClick={this.select}
                            data-mode="new"
                        >
                            Новые
                        </Cell>
                        <Cell
                            before={<Icon16CheckCircleOutline />}
                            asideContent={this.state.mode === 'passed' ? <Icon24Done fill="var(--accent)" /> : null}
                            onClick={this.select}
                            data-mode="passed"
                        >
                            Пройденные
                        </Cell>
                    </List>
                </HeaderContext>
                <Group>
                    <SCList cells={cells}/>
                </Group>
            </Panel>
        );
    }

    toggleContext = () => {
        this.setState({ contextOpened: !this.state.contextOpened });
    };

    select = (e) => {
        const mode = e.currentTarget.dataset.mode;
        this.setState({ mode });
        this.props.changeMode(mode);
        requestAnimationFrame(this.toggleContext);
    };
}

Polls.propTypes = {
    id: PropTypes.string.isRequired,
    changeActiveStory: PropTypes.func.isRequired,
    selectCell: PropTypes.func.isRequired,
};
