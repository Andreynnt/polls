export default class HttpService {
    static getUrl() {
        return "http://johnylemming.ru/api/getpolls";
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
        return fetch(HttpService.getUrl())
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

    static dataToPollModels(data) {
        if (!data) {
            return {};
        }

        const result = data.map((poll, i) => {
            let convertedPoll = {};
            convertedPoll.id = poll.id || "0";
            convertedPoll.name = poll.name || "No name";
            convertedPoll.description = poll.description || "No description";
            convertedPoll.passed = poll.status || "No status";
            convertedPoll.polls = [];
            convertedPoll.currentQuestionNum = 0;
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
              "passed": true,
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
              "passed": false,
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