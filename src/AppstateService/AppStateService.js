
class AppStateService{
    constructor() {
        if (typeof AppStateService === 'object'){
            console.log("instance returned");
            return AppStateService.instance;
        }
        AppStateService.instance = this;

        this.walletAddress = '';
        this.connected = false
    }

    connectToMetaMask = async ()=> {
        try {
            if (typeof window != 'undefined' && typeof window.ethereum != 'undefined'){
                const accounts = window.ethereum.request({method: "eth_requestAccounts"}).then((data) => {
                    console.log(data[0]);
                    this.walletAddress = data[0];
                    this.connected = true
                    console.log('wallet address from singleton: ', this.walletAddress);
                }).catch((error) => {
                    console.log('error in singleton : ', error);
                })   
            }
        } catch (error) {
            console.log("refused the request to sign");
        }
      }
 
}