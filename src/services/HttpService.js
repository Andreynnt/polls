export default class HttpService {
    static parseJson(data) {
        let response = null;
        try {
            response = JSON.parse(data);
        } catch (e) {
            console.log("Parse JSON error: ", e.toString());
        }
        return response
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