
class AppStateService{
    constructor() {
        if (typeof AppStateService === 'object'){
            console.log("instance returned");
            return AppStateService.instance;
        }
        AppStateService.instance = this;
    }
    

}
