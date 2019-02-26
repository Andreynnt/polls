import React from 'react';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import PropTypes from "prop-types";


export default class SCTabbar extends React.Component {
    render() {
        return (
            <Tabbar>
                <TabbarItem
                    onClick={this.props.changeActiveStory}
                    selected={this.props.activeStory === 'polls'}
                    data-story="polls"
                >
                    <Icon28Newsfeed />
                </TabbarItem>
                <TabbarItem
                    onClick={this.props.changeActiveStory}
                    selected={this.props.activeStory === 'profile'}
                    data-story="profile"
                >
                    <Icon28User />
                </TabbarItem>
            </Tabbar>
        );
    }
}

SCTabbar.propTypes = {
    changeActiveStory: PropTypes.func.isRequired,
    activeStory: PropTypes.string.isRequired
};
