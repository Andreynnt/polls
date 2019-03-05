import React from 'react';
import { View, Epic } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Polls from './panels/Polls';
import SCTabbar from './blocks/SCTabbar';
import Profile from "./panels/Profile";
import Poll from "./panels/Poll";
import connect from "react-redux/es/connect/connect";


class App extends React.Component {
	render() {
		const preparedTabbar = (<SCTabbar/>);
		return (
			<Epic activeStory={this.props.navigation.activeStory} tabbar={preparedTabbar}>
				<View popout={this.props.navigation.alert} id="polls" activePanel={this.props.navigation.activePanel}>
					<Polls id="polls"/>
					<Poll id="poll"/>
				</View>
				<View id="profile" activePanel={this.props.navigation.activeStory}>
					<Profile id="profile"/>
				</View>
			</Epic>
		);
	}
}

const mapStateToProps = state => {
	return {
		navigation: state.navigation
	};
};

export default connect(mapStateToProps)(App);
