class AppService {
    constructor(mode = null) {
        this.mode = mode;
    }
}

let instance = new AppService();

export function shared() {
    return instance;
}