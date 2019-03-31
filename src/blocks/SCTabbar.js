import React from 'react';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import Icon28User from '@vkontakte/icons/dist/28/user';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import connect from "react-redux/es/connect/connect";
import Icon28Users from '@vkontakte/icons/dist/28/users';
import Icon28Settings from '@vkontakte/icons/dist/28/settings';

export class SCTabbar extends React.Component {
    render() {
        return (
            <Tabbar>
                <TabbarItem
                    onClick={this.props.changeActiveStory}
                    selected={this.props.navigation.activeStory === 'polls'}
                    data-story="polls"
                >
                    <Icon28Newsfeed />
                </TabbarItem>
                <TabbarItem
                    onClick={this.props.changeActiveStory}
                    selected={this.props.navigation.activeStory === 'leaders'}
                    data-story="leaders"
                >
                    <Icon28Users />
                </TabbarItem>
                <TabbarItem
                    onClick={this.props.changeActiveStory}
                    selected={this.props.navigation.activeStory === 'profile'}
                    data-story="profile"
                >
                    <Icon28Settings />
                </TabbarItem>
            </Tabbar>
        );
    }
}


const mapStateToProps = state => {
    return {
        navigation: state.navigation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeActiveStory: (e) => {
            dispatch({ type: "CHANGE_STORY", payload: e.currentTarget.dataset.story });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SCTabbar);