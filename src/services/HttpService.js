import {appModes} from "../App";
import * as AppService from "./AppService";
import connect from '@vkontakte/vkui-connect';
//import VKConnect from '@vkontakte/vkui-connect-mock';



// либо connect либо wrapper
const connectWrapper = connect;

const APP_ID = 6874095;



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

        const result = data.map(poll => {
            let convertedPoll = {};
            convertedPoll.id = poll.id || "0";
            convertedPoll.name = poll.name || "No name";
            convertedPoll.description = poll.description || "No description";
            convertedPoll.status = poll.status || "No status";
            convertedPoll.polls = [];
            convertedPoll.currentQuestionNum = 0;
            convertedPoll.answers = [];
            convertedPoll.author = poll.author || "Anonymous";
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

    static getAuthToken(callback) {
        connectWrapper.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppAccessTokenReceived':
                    callback({data: e.detail.data, error: null});
                    break;
                default:
                    callback({data: null, error: e.detail.type});
            }
        });
        connect.send("VKWebAppGetAuthToken", {"app_id": APP_ID, "scope": "friends,status"});
    }

    static getInfo(token, callback) {
        connect.subscribe((e) => {
            callback(null, e);
            switch (e.detail.type) {
                case 'VKWebAppCallAPIMethodResult':
                    callback(null, e.detail.data);
                    break;
                default:
                    callback(e.detail.type, null);
            }
        });
        connect.send("VKWebAppCallAPIMethod", {"method": "users.get", "params": {"v":"5.92", "access_token":`${token}`,
        "fields": `first_name, last_name, is_closed, can_access_closed, photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, 
        photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, 
        common_count, occupation, nickname, relatives, relation, personal, connections, exports, activities, interests, music, movies, tv, books, 
        games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, 
        timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me`
        }});
    }

    static sendToEchoServer(data) {
        fetch('http://localhost:3000/post', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify(data)
        }).then(function(response) {
            console.log(response);
            return response;
        })
    }

    static parseDefaultJson() {
        const pollsJSON= `
        [
            {
              "id": "myId1",
              "name": "Выбор лучшей песни1",
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
              "id": "myId1",
              "name": "Выбор лучшей песни2",
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
              "id": "myId1",
              "name": "Выбор лучшей песни3",
              "description": "Выбираем лучшую песню 2019 года",
              "author": "Олег Газманов, или кто-то еще другой.",
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
              "id": "myId1",
              "name": "Выбор лучшей песни4eweeeewew",
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
              "id": "myId1",
              "name": "Выбор лучшей песни4eweeeewew",
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