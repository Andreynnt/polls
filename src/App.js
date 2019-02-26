import React from 'react';
import { View, Epic } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Polls from './panels/Polls';
import SCTabbar from './blocks/SCTabbar';
import Profile from "./panels/Profile";


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'polls',
			fetchedUser: null,
			activeStory: 'polls'
		};
	}

	changeActiveStory = (e) => {
		this.setState({activeStory: e.currentTarget.dataset.story });
	};

	render() {
		const preparedTabbar = (<SCTabbar activeStory={this.state.activeStory} changeActiveStory={this.changeActiveStory}/>);
		return (
			<Epic activeStory={this.state.activeStory} tabbar={preparedTabbar}>
				<View id="polls" activePanel={this.state.activeStory}>
					<Polls id="polls" changeActiveStory={this.changeActiveStory}/>
				</View>
				<View id="profile" activePanel={this.state.activeStory}>
					<Profile id="profile" changeActiveStory={this.changeActiveStory}/>
				</View>
			</Epic>
		);
	}
}

export default App;
