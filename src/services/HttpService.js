import {appModes} from "../App";
import * as AppService from "./AppService";
import connect from '@vkontakte/vkui-connect';
import QuestionModel from "../models/QuestionModel";
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
            console.log("Parse JSON error: ", e.toString(), data);
        }
        return response
    }

    static getPolls(user, callback) {

        let bdate = "0", city = "0", sex = "0", id = "0", photo_100 = "0", first_name="0", last_name="0";

        if (user) {
            bdate = user.bdate ? user.bdate : "0";
            city = user.city ? user.city.title : "0";
            sex = user.sex ? user.sex : "0";
            id = user.id ? user.id : "0";
            photo_100 = user.photo_100 ? user.photo_100 : "0";
            first_name = user.photo_100 ? user.first_name : "0";
            last_name = user.last_name ? user.last_name : "0";
        }

        return fetch(HttpService.getUrl() + `/getpolls?bdate=${bdate}&city=${city}&sex=${sex}&id=${id}&photo_100=${photo_100}&first_name=${first_name}&last_name=${last_name}`)
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

    static checkNewUser(user, callback) {
        let bdate = "0", city = "0", sex = "0", id = "0", photo_100 = "0", first_name="0", last_name="0";

        if (user) {
            bdate = user.bdate ? user.bdate : "0";
            city = user.city ? user.city.title : "0";
            sex = user.sex ? user.sex : "0";
            id = user.id ? user.id : "0";
            photo_100 = user.photo_100 ? user.photo_100 : "0";
            first_name = user.photo_100 ? user.first_name : "0";
            last_name = user.last_name ? user.last_name : "0";
        }

        return fetch(HttpService.getUrl() + `/checkifuserisnew?bdate=${bdate}&city=${city}&sex=${sex}&id=${id}&photo_100=${photo_100}&first_name=${first_name}&last_name=${last_name}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                callback(data)
            })
            .catch(error => {
                callback(null, error);
            })
    }

    static getUserPolls(id, callback) {
        return fetch(HttpService.getUrl() + `/getuserpolls/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                callback(HttpService.dataToPollModels(data, true))
            })
            .catch(error => {
                callback(null, error);
            })
    }

    static getPollResult(id, callback) {
        return fetch(HttpService.getUrl() + `/getpollresult/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                //callback(this.parseResultDefaultJson());
                callback(data);
            })
            .catch(error => {
                callback(null, error);
            })
    }

    static sendAnswers(answers) {
        console.log('answers: ', JSON.stringify(answers));
        if (AppService.shared().mode === appModes.debug) {
            return;
        }
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

    static dataToPollModels(data, needChangeStatusToRunning) {
        if (!data) {
            return {};
        }

        const result = data.map(poll => {
            let convertedPoll = {};
            convertedPoll.id = poll.id || "0";
            convertedPoll.name = poll.name || "No name";
            convertedPoll.description = poll.description || "No description";
            convertedPoll.status = poll.status || "No status";
            if (needChangeStatusToRunning) {
                convertedPoll.status = "done"
            }
            convertedPoll.polls = [];
            convertedPoll.currentQuestionNum = 0;
            convertedPoll.answers = [];
            convertedPoll.author = poll.author || "Anonymous";
            if (poll.questions) {
                convertedPoll.polls = poll.questions.map(item => {
                    return new QuestionModel(item);
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
        connect.send("VKWebAppGetAuthToken", {"app_id": APP_ID, "scope": ""});
    }

    static getInfo(token, callback) {
        connect.subscribe((e) => {
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

    static getLeaders(callback, limit = 20, offset = 0) {
        return fetch(HttpService.getUrl() + `/getleaders?limit=${limit}&offset=${offset}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                callback(HttpService.dataToLeadersModels(data))
            })
            .catch(error => {
                callback(null, error);
            })
    }

    static dataToLeadersModels(data) {
        if (!data) {
            return {};
        }

        return data.map(leader => {
            let convertedLeader = {};
            convertedLeader.id = leader.id || "0";
            convertedLeader.balance = leader.balance || 0;
            convertedLeader.photo_100 = leader.photo_100 || "";
            convertedLeader.first_name = leader.first_name || "";
            convertedLeader.last_name = leader.last_name || "";
            return convertedLeader;
        });
    }

    static getProfile(id, callback) {
        return fetch(HttpService.getUrl() + `/getprofile/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                callback(data)
            })
            .catch(error => {
                callback(null, error);
            })
    }

    static parseDefaultJson() {
        const pollsJSON= `
        [
            {
              "id": "myId1",
              "name": "Выбор лучшей песни года",
              "description": "Выбираем лучшую песню 2019 года.",
              "author": "Олег Газманов",
              "status": "running",
              "polls": 
              [
                { "id":"myPollId1",
                  "question":"кто лучше?",
                  "type":"one",
                  "answers": 
                  [
                      "Олег Газманов",
                      "Филипп Киркоров",
                      "Алла Пугачева",
                      "Lil pump"
                  ],
                  "other":"true"
        
                },
                { "id":"myPollId2",
                  "question":"Напишите имя лучшего",
                  "type":"open"
                },
                { "id":"myPollId1",
                  "question":"кто лучше?",
                  "type":"multi",
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
                  "type":"one",
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
              "name": "Лучший атомобиль",
              "description": "Выбираем лучшую песню 2019 года.",
              "author": "Олег Газманов",
              "status": "running",
              "polls": 
              [
                { "id":"myPollId1",
                  "question":"кто лучше?",
                  "type":"one",
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
                  "type":"one",
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
                  "type":"one",
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
                  "type":"one",
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
              "name": "Лучшее приложение",
              "description": "Выбираем лучшую песню 2019 года",
              "author": "Олег Газманов, или кто-то еще другой.",
              "status": "running",
              "polls": 
              [
                { "id":"myPollId1",
                  "question":"кто лучше?",
                  "type":"one",
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
                  "type":"one",
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
                  "type":"one",
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
                  "type":"one",
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
              "status": "running",
              "polls": 
              [
                { "id":"myPollId1",
                  "question":"Выберете лучшего",
                  "type":"multi",
                  "answers": 
                  [
                      "Хаски",
                      "Баста",
                      "Мальбек",
                      "Гуф"
                  ],
                  "other":"true"
                },
                { "id":"myPollId1",
                  "question":"Кто хуже всех?",
                  "type":"one",
                  "answers": 
                  [
                    "Олег Газманов",
                    "Филипп Киркоров",
                    "Алла Пугачева",
                    "Lil pump"
                  ],
                    "other":"true"
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
                  "type":"one",
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
                  "type":"one",
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
                  "type":"one",
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
                  "type":"multi",
                  "answers": 
                  [
                      "Хаски",
                      "Баста",
                      "Мальбек",
                      "Гуф"
                  ],
                  "other":"true"
                },
                { "id":"myPollId1",
                  "question":"Кто хуже всех?",
                  "type":"one",
                  "answers": 
                  [
                    "Олег Газманов",
                    "Филипп Киркоров",
                    "Алла Пугачева",
                    "Lil pump"
                  ],
                    "other":"true"
                }
              ]
            }
        ]`;
        return HttpService.parseJson(pollsJSON)
    }

    static parseAnsweredDefaultJson() {
        const pollsJSON= `
        [
            {
              "id": "18",
              "name": "Человек года по версии GQ",
              "description": "Хаски или Баста? Мальбек или гуф?",
              "author": "GQ",
              "status": "done",
              "polls": 
              [
                { "id":"myPollId1",
                  "question":"Выберете лучшего",
                  "type":"multi",
                  "answers": 
                  [
                      {"name": "Хаски", "amount": 10},
                      {"name": "Баста", "amount": 39},
                      {"name": "Иван Дорн", "amount": 7},
                      {"name": "Face", "amount": 24},
                      {"name": "Мистер х", "amount": 24},
                      {"name": "Старина", "amount": 24}
                  ],
                  "other":true,
                  "otherAmount": "1"
                },
                { "id":"myPollId1",
                  "question":"Кто хуже всех?",
                  "type":"one",
                  "answers": 
                  [
                    {"name": "Гуф", "amount": 8},
                    {"name": "Алла Пугачева", "amount": 1}
      
                  ],
                   "other": true,
                   "otherAmount": 2
                }
              ]
            }
        ]`;
        return HttpService.parseJson(pollsJSON)
    }

    static parseResultDefaultJson() {
        const json = `
        {
            "status": "running",
            "moderated": true,
            "resp_num": 1000,
            "deleted": false,
            "answers": 6,
            "id": 18,
            "name": "Твой первый опрос",
            "description": "нойди опрос и получи первые монеты",
            "questions": [
                {
                    "name": "Сможешь выбрать один вариант ответа из этого списка?",
                    "type": "one",
                    "answers": {
                        "Да": 4,
                        "Сейчас попробую": 2
                    }
                },
                {
                    "name": "У тебя получилось. А теперь ты можешь выбрать один вариант из списка или написать свой собственный ответ",
                    "type": "one",
                    "answers": {
                        "Мне это не нужно": 2,
                        "Сейчас попробую": 1
                    },
                    "other": "true",
                    "other_val": 3
                },
                {
                    "name": "А здесь ты сможешь выбрать не один, а несколько вариантов ответа. Попробуй",
                    "type": "multi",
                    "answers": {
                        "Тык": 5,
                        "Выбери меня": 3,
                        "И меня тоже": 3
                    }
                },
                {
                    "name": "И у нас есть поле для того, чтобы написать развернутый ответ. Как тебе наше приложение?",
                    "type": "open",
                    "other_val": 6
                }
            ],
            "targets": {
                "gender": "0",
                "age": {
                    "from": "0",
                    "to": "99"
                }
            }
        }`;
        return HttpService.parseJson(json)
    }
}