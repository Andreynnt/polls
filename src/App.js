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
		const preparedTabbar = (<SCTabbar activeStory={this.props.testStore.activeStory} changeActiveStory={this.props.changeActiveStory}/>);
		return (
			<Epic activeStory={this.props.testStore.activeStory} tabbar={preparedTabbar}>
				<View popout={this.props.testStore.alert} id="polls" activePanel={this.props.testStore.activePanel}>
					<Polls id="polls"
						   changeActiveStory={this.props.changeActiveStory}
						   selectCell={this.props.selectCell}
						   pollModels={this.props.testStore.pollModels}
						   mode={this.props.testStore.pollsMode}
						   changeMode={this.props.changeMode}
					/>
					<Poll id="poll"
						  changeActiveStory={this.props.changeActiveStory}
						  model={this.props.testStore.selectedPoll}
						  changeActivePanel={this.props.changeActivePanel}
						  showPopout={this.props.setPopout}
						  closePopout={this.props.closePopout}
					/>
				</View>
				<View id="profile" activePanel={this.props.testStore.activeStory}>
					<Profile id="profile" changeActiveStory={this.props.changeActiveStory}/>
				</View>
			</Epic>
		);
	}
}

const mapStateToProps = state => {
	return {
		testStore: state
	};
};

export default connect(
	mapStateToProps,
	(dispatch) => ({
		changeActiveStory: (e) => {
			dispatch({ type: "CHANGE_STORY", payload: e.currentTarget.dataset.story });
		},
		changeActivePanel: (e) => {
			dispatch({ type: "CHANGE_PANEL", payload: e.currentTarget.dataset.to })
		},
		selectCell: (model) => {
			dispatch({ type: "CLICK_CELL", payload: model})
		},
		setPopout: (alert) => {
			dispatch({ type: "RETURN_AND_SHOW_POPOUT", payload: alert})
		},
		closePopout: () => {
			dispatch({ type: "CLOSE_POPOUT" })
		},
		changeMode: (mode) => {
			dispatch({ type: "CHANGE_MODE",  payload: mode})
		}
	})
)(App);
