import React from 'react';
import { View, Epic, ScreenSpinner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Polls from './panels/PollsPanel';
import SCTabbar from './blocks/SCTabbar';
import ProfilePanel from "./panels/ProfilePanel";
import Poll from "./panels/PollPanel";
import connect from "react-redux/es/connect/connect";
import PreloaderPanel from "./panels/PreloaderPanel";
import HttpService from "./services/HttpService";
import PollModel from "./models/PollModel";
import * as AppService from "./services/AppService";

export const appModes = {
	debug: 'debug',
	prod: 'prod'
};

const mode = appModes.debug;


class App extends React.Component {
	constructor(props) {
		super(props);
		AppService.shared().mode = mode;

		const setDefaultModels = () => {
			const polls = HttpService.parseDefaultJson();
			let pollModels = polls.map(poll => new PollModel(poll));
			this.props.gotPollModels(pollModels);
			setTimeout(() => {this.props.closeMainPreloader();}, 0);
		};

		const setWebModels = () => {
			HttpService.getPolls((models, error) => {

				if (error) {
					console.log("error", error);
					//todo показывать error panel
					this.props.gotError(error);
					return;
				}

				console.log("GOOD, models: ", models);
				this.props.gotPollModels(models);
				this.props.closeMainPreloader();
			});
		};

		if (AppService.shared().mode === appModes.prod) {
			setWebModels();
		} else if (AppService.shared().mode === appModes.debug) {
			setDefaultModels();
		}
	}


	render() {
		const preparedTabbar = (<SCTabbar/>);
		return (
			<Epic activeStory={this.props.navigation.activeStory} tabbar={preparedTabbar}>
				<View popout={<ScreenSpinner />} id="preloader" activePanel="preloader">
					<PreloaderPanel/>
				</View>

				<View popout={this.props.navigation.alert} id="polls" activePanel={this.props.navigation.activePanel}>
					<Polls id="polls"/>
					<Poll id="poll"/>
				</View>

				<View id="profile" activePanel={this.props.navigation.activeStory}>
					<ProfilePanel id="profile"/>
				</View>
			</Epic>
		);
	}
}

const mapStateToProps = state => {
	return {
		navigation: state.navigation,
		models: state.models
	};
};

const mapDispatchToProps = dispatch => {
	return {
		gotPollModels: (models) => {
			dispatch({ type: "GOT_POLLS_FROM_BACKEND", pollModels: models})
		},
		gotError: (error) => {
			dispatch({ type: "GOT_ERROR_FROM_BACKEND", error: error})
		},
		closeMainPreloader: () => {
			dispatch({ type: "CLOSE_MAIN_PRELOADER_AND_OPEN_APP"});
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
