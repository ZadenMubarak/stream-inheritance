import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
import { ethers } from "ethers";

class AppStateService{
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

        // Replace with your contract ABI
        this.contractAbi = [
          [
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "vaultCreator",
                  "type": "address"
                }
              ],
              "name": "callClaim",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_balance",
                  "type": "uint256"
                }
              ],
              "name": "closeVault",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address payable",
                  "name": "_beneficiary",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "_meta",
                  "type": "string"
                }
              ],
              "name": "createStreamVault",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "stateMutability": "payable",
              "type": "constructor"
            },
            {
              "stateMutability": "payable",
              "type": "receive"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_creator",
                  "type": "address"
                }
              ],
              "name": "streamOf",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "vaultAddress",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "beneficiaryAddress",
                      "type": "address"
                    },
                    {
                      "internalType": "string",
                      "name": "beneficiaryMetaData",
                      "type": "string"
                    }
                  ],
                  "internalType": "struct StreamInherit.Vault",
                  "name": "_value",
                  "type": "tuple"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
          ]
        ];

        this.polyBaseResponse = [];
        this.fullResponse = []
        this.beneficiaryResponse = [];
        this.nextPolybaseRecordID = null;
        this.privateKey = "93ee0d98a20ebfda7dde01bc32ee3fbca2d7f385890162e4a6f55eb466fccb5f";
        this.provider = new ethers.BrowserProvider(window.ethereum)

        // Create a new wallet with the private key
        const wallet = new ethers.Wallet(this.privateKey);
        // const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

        // Replace with the address of the vault creator
        this.vaultCreator = this.walletAddress;
        this.collectionReference = db.collection('StreamInherritance');
        this.contractAddress = "0xedca24cdae6df8af5d5b909fdb4455a0f8796695";


    }

    
    generatePolybaseID = () => {
        this.nextPolybaseRecordID = this.polyBaseResponse.length + 1;
        return this.nextPolybaseRecordID.toString();
    }

    getBeneficiaryFromRecord(address) {
      // const address = localStorage.getItem("userWalletAddress");
      return new Promise((resolve, reject) => {
        this.collectionReference
          .where("beneficiaryAddress", "==", address)
          .get()
          .then((data) => {
            let array = data.data;
            let temp = [];
  
            array.forEach((element) => {
              temp.push(element.data);
            });
  
            this.beneficiaryResponse = temp;
            console.log("beneficiary ", this.beneficiaryResponse);
            resolve(temp);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    }

    getItemsFromRecord(address) {
        // this.collectionReference.record("1").call("del");
        // const address = localStorage.getItem("userWalletAddress");
        return new Promise((resolve, reject) => {
          this.collectionReference
            .where("walletAddress", "==", address)
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

      getFullData(){
        return new Promise((resolve, reject) => {
            this.collectionReference
              .get()
              .then((data) => {
                let array = data.data;
                let temp = [];
      
                array.forEach((element) => {
                  temp.push(element.data);
                });
      
                this.fullResponse = temp;
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
        let id = this.generatePolybaseID()
        console.log('log id',this.fullResponse);
        await this.collectionReference.create([
            id,
            projectObject.streamCreatorName,
            projectObject.benficiaryName,
            projectObject.beneficiaryDetails,
            projectObject.numberOfMonthsToStream,
            projectObject.walletAddress,
            projectObject.beneficiaryAddress,
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
                    localStorage.setItem("userWalletAddress", this.walletAddress);
                }).catch((error) => {
                    console.log('error in singleton : ', error);
                })   
            }
        } catch (error) {
            console.log("refused the request to sign");
        }
      }

    async callClaim() {

      const contractAbi = [
        [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "vaultCreator",
                "type": "address"
              }
            ],
            "name": "callClaim",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_balance",
                "type": "uint256"
              }
            ],
            "name": "closeVault",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address payable",
                "name": "_beneficiary",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "_meta",
                "type": "string"
              }
            ],
            "name": "createStreamVault",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "stateMutability": "payable",
            "type": "constructor"
          },
          {
            "stateMutability": "payable",
            "type": "receive"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_creator",
                "type": "address"
              }
            ],
            "name": "streamOf",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "vaultAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "beneficiaryAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "string",
                    "name": "beneficiaryMetaData",
                    "type": "string"
                  }
                ],
                "internalType": "struct StreamInherit.Vault",
                "name": "_value",
                "type": "tuple"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]
      ];

      let provider = new ethers.BrowserProvider(window.ethereum);
      
      let signer = provider.getSigner();
      const contractAddress = "0xedca24cdae6df8af5d5b909fdb4455a0f8796695";
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);
      try {
        // const userWalletAddress = this.walletAddress;
        const transaction = await this.contract.callClaim(this.vaultCreator);
        
        // await transaction.wait();
        console.log("callClaim function executed successfully");
      } catch (error) {
        console.error("Error calling callClaim function:", error.message);
      }
    }
 
}

const appStateService = new AppStateService();

export { appStateService };