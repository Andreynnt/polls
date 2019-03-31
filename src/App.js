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
import LeadersPanel from "./panels/LeadersPanel";


export const appModes = {
	debug: 'debug',
	prod: 'prod'
};

const mode = appModes.prod;


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

				console.log("setWebModels() success: ", models);
				this.props.gotPollModels(models);
				this.props.closeMainPreloader();
			});
		};

		if (AppService.shared().mode === appModes.prod) {
			setWebModels();
			//this.getUser();
		} else if (AppService.shared().mode === appModes.debug) {
			setDefaultModels();
		}
	}

	componentWillMount() {
		this.getUser();
	}

	getUser = () => {
		HttpService.getAuthToken(({data, error}) => {
			if (error) {
				console.error('getAuthToken(): error:', error);
			} else {
				const token = data ? data.access_token : "noToken";

				HttpService.getInfo(token, (error2, response) => {
					if (error2) {
						console.error(error2.toString());
						//эта херня ломает профиль и закрытие
						//this.props.gotUserInfo({first_name: error2.message})
					} else {
						this.props.gotUserInfo(response.response[0]);
					}
				});
			}
		});
	};

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

				<View id="leaders" activePanel={this.props.navigation.activeStory}>
					<LeadersPanel id="leaders"/>
				</View>

				<View id="profile" activePanel={this.props.navigation.activeStory}>
					<ProfilePanel user={this.props.user.user} id="profile"/>
				</View>
			</Epic>
		);
	}
}

const mapStateToProps = state => {
	return {
		navigation: state.navigation,
		models: state.models,
		user: state.user
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
		},
		gotUserInfo: (user) => {
			dispatch({ type: "GOT_USER_INFO", user: user})
		},
		gotUserToken: (accessToken) => {
			dispatch({ type: "GOT_USER_TOKEN", accessToken: accessToken})
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
