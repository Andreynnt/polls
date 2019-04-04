import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Cell, PanelHeaderContent, HeaderContext, List } from '@vkontakte/vkui';
import SCList from "../blocks/SCList";
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import connect from "react-redux/es/connect/connect";
import SCCell from "../blocks/SCCell";
import '../css/separatorForGroup.css';
import Icon24Flash from '@vkontakte/icons/dist/24/flash';
import Icon24RecentOutline from '@vkontakte/icons/dist/24/recent_outline';

export class PollsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contextOpened: false,
            statuses: {
                'STATUS_CREATED': 'created',
                'STATUS_READY': 'ready',
                'STATUS_RUNNING': 'running',
                'STATUS_DONE': 'done',
            }
        };
    }

    render() {

        let polls = this.props.models.pollModels.map((item, i) => {
            if (!(((item.status === this.state.statuses['STATUS_DONE']) && this.props.navigation.pollsMode === 'passed') || (((item.status === this.state.statuses['STATUS_RUNNING']) && this.props.navigation.pollsMode === 'new')))) {
                return null
            }
            return {
                author: item.author,
                action: () => item.status === this.state.statuses['STATUS_RUNNING'] ? this.props.selectCell(item, i) : null,
                dataTo:"poll",
                name: item.name
            };
        });

        let filteredPolls = polls.filter(item => item !== null);

        let lastPoll = null;
        if ((filteredPolls.length % 2) === 1) {
            lastPoll = filteredPolls.pop();
        }

        let cells = [];
        let cellKey = 0;
        for (let i = 0; i < filteredPolls.length - 1; i += 2) {
            cells.push(
                <SCCell key={cellKey} blocks={[filteredPolls[i], filteredPolls[i + 1]]}/>
            );
            cellKey++;
        }

        if (lastPoll != null) {
            cells.push(<SCCell key={cellKey} blocks={[lastPoll]}/>)
        }

        const title = this.props.navigation.pollsMode === 'new' ? "Новые" : "Пройденные";

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
                            before={<Icon24Flash />}
                            asideContent={this.props.navigation.pollsMode === 'new' ? <Icon24Done fill="var(--accent)" /> : null}
                            onClick={this.select}
                            data-mode="new"
                            style={{padding: "0 12px"}}
                        >
                            Новые
                        </Cell>
                        <Cell
                            before={<Icon24RecentOutline />}
                            asideContent={this.props.navigation.pollsMode === 'passed' ? <Icon24Done fill="var(--accent)" /> : null}
                            onClick={this.select}
                            data-mode="passed"
                            style={{padding: "0 12px"}}
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
        this.props.changeMode(mode);
        requestAnimationFrame(this.toggleContext);
    };
}

PollsPanel.propTypes = {
    id: PropTypes.string.isRequired,
    selectCell: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        navigation: state.navigation,
        models: state.models
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectCell: (model, i) => {
            dispatch({ type: "CLICK_CELL", payload: {model, i}})
        },
        changeMode: (mode) => {
            dispatch({ type: "CHANGE_MODE",  payload: mode})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PollsPanel);
