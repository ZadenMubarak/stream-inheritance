import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";

export class AppStateService{
    constructor() {
        if (typeof AppStateService === 'object'){
            console.log("instance returned");
            return AppStateService.instance;
        }
        AppStateService.instance = this;
        console.log("instance created");

        this.walletAddress = '';
        this.connected = false;

        const db = new Polybase({
            defaultNamespace: "pk/0xbd242ce427525d219c617b9856f0052b52334321d47d1793a7653cab5b2dac45792735a33e4b2789cbf8063555816d8a37226f8b393645c78244c175a010fbed/stream-inherritance",
        });
        const auth = new Auth()
        db.signer(async (data) => {
            return {
                h: 'eth-personal-sign',
                sig: await auth.ethPersonalSign(data)
        }});

        this.polyBaseResponse = [];
        this.nextPolybaseRecordID = null;
        this.collectionReference = db.collection('StreamInherritance');

    }

    
    generatePolybaseID = () => {
        this.nextPolybaseRecordID = this.polyBaseResponse.length + 1;
        return this.nextPolybaseRecordID.toString();
    }

    getItemsFromRecord() {
        return new Promise((resolve, reject) => {
          this.collectionReference
            .get()
            .then((data) => {
              let array = data.data;
              let temp = [];
    
              array.forEach((element) => {
                temp.push(element.data);
              });
    
              this.polyBaseResponse = temp;
              console.log("response from singleton: ", this.polyBaseResponse);
              resolve(temp);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
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