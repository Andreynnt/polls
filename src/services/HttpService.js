import {appModes} from "../App";
import * as AppService from "./AppService";

export default class HttpService {
    static getUrl() {
        return "https://johnylemming.ru/api";
    }

    static parseJson(data) {
        let response = null;
        try {
            response = JSON.parse(data);
        } catch (e) {
            console.log("Parse JSON error: ", e.toString());
        }
        return response
    }

    static getPolls(callback) {
        return fetch(HttpService.getUrl() + '/getpolls')
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                callback(HttpService.dataToPollModels(data))
            })
            .catch(error => {
                callback(null, error);
            })
    }

    static sendAnswers(answers) {
        if (AppService.shared().mode === appModes.debug) {
            return;
        }

        console.log(JSON.stringify(answers));
        fetch(HttpService.getUrl() + '/postanswers', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify(answers)
        }).then(function(response) {
            console.log(response);
            return response;
        })
    }

    static dataToPollModels(data) {
        if (!data) {
            return {};
        }

        const result = data.map((poll, i) => {
            let convertedPoll = {};
            convertedPoll.id = poll.id || "0";
            convertedPoll.name = poll.name || "No name";
            convertedPoll.description = poll.description || "No description";
            convertedPoll.status = poll.status || "No status";
            convertedPoll.polls = [];
            convertedPoll.currentQuestionNum = 0;
            convertedPoll.answers = [];
            if (poll.questions) {
                convertedPoll.polls = poll.questions.map(item => {
                    let convertedItem = {};
                    convertedItem.question = item.name;
                    convertedItem.answers = item.answers;
                    return convertedItem;
                });
            }
            return convertedPoll;
        });
        return result;
    }

    static parseDefaultJson() {
        const pollsJSON= `
        [
            {
              "id": "myId1",
              "name": "Выбор лучшей песни",
              "description": "Выбираем лучшую песню 2019 года.",
              "author": "Олег Газманов",
              "status": "running",
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
                  "question":"Выберете самого плохого артиста",
                  "type":"radio",
                  "answers": 
                  [    
                      "Алла Пугачева",
                      "Lil pump",
                      "Олег Газманов",
                      "Филипп Киркоров"
                  ]
                }
              ]
            },
            {
              "id": "myId2",
              "name": "Человек года по версии GQ",
              "description": "Хаски или Баста? Мальбек или гуф?",
              "author": "GQ",
              "status": "done",
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
        return HttpService.parseJson(pollsJSON)
    }
}