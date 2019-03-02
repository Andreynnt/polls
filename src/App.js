import React from 'react';
import { View, Epic } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Polls from './panels/Polls';
import SCTabbar from './blocks/SCTabbar';
import Profile from "./panels/Profile";
import Poll from "./panels/Poll";
import HttpService from "./services/HttpService";
import PollModel from "./models/PollModel";
import SCAlert from "./blocks/SCAlert";

const pollsJSON= `
[
	{
	  "id": "myId1",
	  "name": "Выбор лучшей песни",
	  "description": "Выбираем лучшую песню 2019 года.",
	  "author": "Олег Газманов",
	  "polls": 
	  [
		{ "id":"myPollId1",
		  "question":"кто лучше?",
		  "type":"radio",
		  "answers": 
		  [
			  "Олег Газманов",
			  "Филипп Киркоров",
			  "Алла Пугачева",
			  "Lil pump"
		  ]
		},
		{ "id":"myPollId2",
		  "question":"а тут кто лучше?",
		  "type":"radio",
		  "answers": 
		  [
			"Иван Дорн",
			"Иван Ургант",
			"Алла Михеева",
			"Гаррет Бейл"
		  ]
		},
		{ "id":"myPollId1",
		  "question":"кто лучше?",
		  "type":"radio",
		  "answers": 
		  [
			  "Олег Газманов",
			  "Филипп Киркоров",
			  "Алла Пугачева",
			  "Lil pump"
		  ]
		},
		{ "id":"myPollId1",
		  "question":"кто лучше?",
		  "type":"radio",
		  "answers": 
		  [
			  "Олег Газманов",
			  "Филипп Киркоров",
			  "Алла Пугачева",
			  "Lil pump"
		  ]
		}
	  ]
	},
	{
	  "id": "myId2",
	  "name": "Человек года по версии GQ",
	  "description": "Хаски или Баста? Мальбек или гуф?",
	  "author": "GQ",
	  "polls": 
	  [
		{ "id":"myPollId1",
		  "question":"Выберете лучшего",
		  "type":"radio",
		  "answers": 
		  [
			  "Хаски",
			  "Баста",
			  "Мальбек",
			  "Гуф"
		  ]
		},
		{ "id":"myPollId1",
		  "question":"Кто хуже всех?",
		  "type":"radio",
		  "answers": 
		  [
			"Олег Газманов",
			"Филипп Киркоров",
			"Алла Пугачева",
			"Lil pump"
		  ]
		}
	  ]
	}
]`;

class App extends React.Component {
	constructor(props) {
		super(props);

		const polls = HttpService.parseJson(pollsJSON);
		let pollModels = polls.map(poll => new PollModel(poll));
		console.log(pollModels);

		this.state = {
			activePanel: 'polls',
			fetchedUser: null,
			activeStory: 'polls',
			selectedPoll: null,
			pollModels: pollModels,
			alert: null
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
