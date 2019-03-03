import React from 'react';
import { View, Epic } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Polls from './panels/Polls';
import SCTabbar from './blocks/SCTabbar';
import Profile from "./panels/Profile";
import Poll from "./panels/Poll";
import HttpService from "./services/HttpService";
import PollModel from "./models/PollModel";


class App extends React.Component {
	constructor(props) {
		super(props);

		const polls = HttpService.parseDefaultJson();
		let pollModels = polls.map(poll => new PollModel(poll));

		this.state = {
			activePanel: 'polls',
			fetchedUser: null,
			activeStory: 'polls',
			selectedPoll: null,
			pollModels: pollModels,
			alert: null,
			pollsMode: 'new'
		};
	}

	changeActiveStory = (e) => {
		this.setState({activeStory: e.currentTarget.dataset.story });
	};

	changeActivePanel = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	selectCell = (model) => {
		this.setState({ activePanel: "poll", selectedPoll: model})
	};

	setPopout = (alert) => {
		const newState = this.state;
		newState.alert = alert;
		newState.activePanel = "polls";
		this.setState(newState);
	};

	closePopout = () => {
		const newState = this.state;
		newState.alert = null;
		this.setState(newState);
	};

	render() {
		const preparedTabbar = (<SCTabbar activeStory={this.state.activeStory} changeActiveStory={this.changeActiveStory}/>);
		return (
			<Epic activeStory={this.state.activeStory} tabbar={preparedTabbar}>
				<View popout={this.state.alert} id="polls" activePanel={this.state.activePanel}>
					<Polls id="polls"
						   changeActiveStory={this.changeActiveStory}
						   selectCell={this.selectCell}
						   pollModels={this.state.pollModels}
					/>
					<Poll id="poll"
						  changeActiveStory={this.changeActiveStory}
						  model={this.state.selectedPoll}
						  changeActivePanel={this.changeActivePanel}
						  showPopout={this.setPopout}
						  closePopout={this.closePopout}
					/>
				</View>
				<View id="profile" activePanel={this.state.activeStory}>
					<Profile id="profile" changeActiveStory={this.changeActiveStory}/>
				</View>
			</Epic>
		);
	}
}

export default App;
