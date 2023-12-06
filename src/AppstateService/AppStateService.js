import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";

export class AppStateService{
    constructor() {
        if (typeof AppStateService === 'object'){
            console.log("instance returned");
            return AppStateService.instance;
        }
        AppStateService.instance = this;

        this.walletAddress = '';
        this.connected = false;

        const db = new Polybase({
            defaultNamespace: "pk/0xbd242ce427525d219c617b9856f0052b52334321d47d1793a7653cab5b2dac45792735a33e4b2789cbf8063555816d8a37226f8b393645c78244c175a010fbed/stream-inherritance",
        });

        this.polyBaseResponse = [];
        this.nextPolybaseRecordID = null;
        this.collectionReference = db.collection('StreamInherritance');

    }

    
    generatePolybaseID = () => {
        this.nextPolybaseRecordID = this.polybaseResponse.length + 1;
        return this.nextPolybaseRecordID.toString();
    }

    async getItemsFromRecord (address) {
        // this.getUseAddress();
        await this.collectionReference.where("walletAddress", "==", address).get().then((data)=>{
            let array = data.data;
            let temp = []  
            array.forEach(element => {
                temp.push(element.data)
            });
            console.log(temp[0].author);
            console.log("lenth: ", temp.length);
            this.polybaseResponse = temp;
            // console.log('polybase response: ', this.polybaseResponse);
            return temp;
        }).catch((error)=>{
            console.log(error)
        });
    }

    async createProject(projectObject){
        // let id = this.generatePolybaseID()
        await this.collectionReference.create([
            projectObject.id,
            projectObject.streamCreatorName,
            projectObject.benficiaryName,
            projectObject.beneficiaryDetails,
            projectObject.numberOfMonthsToStream,
            projectObject.walletAddress,
        ])
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