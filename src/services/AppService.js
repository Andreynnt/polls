class AppService {
    constructor(mode = null) {
        this.mode = mode;
    }

    pathToImages() {
        if (window.location.hostname === 'localhost') {
            return "../../img/";
        }
        return "/polls/img/"
    }
}

let instance = new AppService();

export function shared() {
    return instance;
}