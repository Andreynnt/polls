import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, Cell, PanelHeaderContent, HeaderContext, List } from '@vkontakte/vkui';
import SCList from "../blocks/SCList";
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon16Fire from '@vkontakte/icons/dist/16/fire';
import Icon16CheckCircleOutline from '@vkontakte/icons/dist/16/check_circle_outline';
import connect from "react-redux/es/connect/connect";


export class PollsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contextOpened: false
        };
    }

    render() {
        let cells = this.props.models.pollModels.map((item, i) => {
                if ((item.passed && this.props.navigation.pollsMode === 'passed') || ((!item.passed && this.props.navigation.pollsMode === 'new'))) {
                    return <Cell key={i}
                                 description={item.author}
                                 onClick={() => this.props.selectCell(item, i)}
                                 data-to="poll"
                                 expandable>
                        {item.name}
                    </Cell>
                }
                return null
            }
        );

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
                            before={<Icon16Fire />}
                            asideContent={this.props.navigation.pollsMode === 'new' ? <Icon24Done fill="var(--accent)" /> : null}
                            onClick={this.select}
                            data-mode="new"
                        >
                            Новые
                        </Cell>
                        <Cell
                            before={<Icon16CheckCircleOutline />}
                            asideContent={this.props.navigation.pollsMode === 'passed' ? <Icon24Done fill="var(--accent)" /> : null}
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
