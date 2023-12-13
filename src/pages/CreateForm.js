import React, { useState, useRef } from "react";

import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { Toast } from 'primereact/toast';
import { Checkbox } from "primereact/checkbox";

import { appStateService } from "../AppstateService/AppStateService";

const CreateForm = () => {
    const [section, setSection] = useState(0);
    const [streamCreatorName, setStreamCreatorName] = useState('');
    const [benficiaryName, setBenficiaryName] = useState('');
    const [walletAddress, seWalletAddress] = useState('');
    const [beneficiaryAddress, setBeneficiaryAddress] = useState('');
    const [numberOfMonthsToStream, setNumberOfMonthsToStream] = useState('');
    const [beneficiaryDetails, setBeneficiaryDetails] = useState('');
    const [usage, setUsage] = useState('');
    const [ethereum, setEthereum] = useState(false);
    const [polygon, setPolygon] = useState(false);
    const [avalanche, setAvalanche] = useState(false);
    const [IdArray, setIdArray] = useState([]);
    // chainlikn eth polygon bnb arbitrium avalanchel optimism
    const toast = useRef(null);
    const service = appStateService;
    console.log('wallet address',service.walletAddress);
    // const IdArray = [];

    service.getItemsFromRecord(service.walletAddress)
    .then((data) => {
      console.log('Polybase response:', data);
      let temp = [];
      data.forEach(element => {
        temp.push(element)
      });
    //   IdArray = temp;
      setIdArray(temp)
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

    
    console.log("ply resp: ", IdArray);


    const submissionButtonEventHandling = () => {
        if (!streamCreatorName || !benficiaryName || !walletAddress || !beneficiaryDetails || !numberOfMonthsToStream || !beneficiaryAddress) {
            toast.current.show({severity:'error', summary: 'Incomplete', detail:' Please fill in all the prompts', life: 3000});

        }else {

            if (service.connected === false){
                toast.current.show({severity:'warn', summary: 'Not allowed', detail:'Connect your wallet to submit', life: 3000});
            }else{

                toast.current.show({severity:'success', summary: 'Success', detail:'Form successfully submitted', life: 3000});
                const db_values = {
                    id:IdArray.length + 1,                
                    streamCreatorName: streamCreatorName,
                    benficiaryName: benficiaryName,
                    beneficiaryDetails: beneficiaryDetails,
                    numberOfMonthsToStream: numberOfMonthsToStream,
                    walletAddress: service.walletAddress,
                    beneficiaryAddress : beneficiaryAddress.toLowerCase(),
                }

                service.createProject(db_values);
                service.createStreamVault(beneficiaryAddress.toLowerCase());
            }
 
        }
    }

    const nextSection = () => {
        setSection(section + 1);
    }
    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-code" aria-label="Code"></button>
            </span>
        );
    };
    const header = renderHeader();

  return (
    <div>
        <Toast ref={toast} />
        <div style={{"height":"20px"}}></div>
        <div className="card flex align-items-center justify-content-center">
            <Card title="List Your Function"  style={{width:"50%"}}>

                { section === 0 && 
                (<div>
                    <label className="block text-900 font-medium mb-2">Stream creator name</label>
                    <InputText placeholder='Enter your name' className="w-full mb-3" onChange={(e)=> {setStreamCreatorName(e.target.value)}}/>

                    <label className="block text-900 font-medium mb-2">Beneficiary name</label>
                    <InputText placeholder='Enter beneficiary name' className="w-full mb-3" onChange={(e)=> {setBenficiaryName(e.target.value)}}/>
                </div>
                )}

                { section ===1 && (
                    <div>
                        <label className="block text-900 font-medium mb-2">Description of beneficiary and stream plan</label>
                        <InputTextarea placeholder='details' className="w-full mb-3" onChange={(e)=> {setBeneficiaryDetails(e.target.value)}}/>

                        <label className="block text-900 font-medium mb-2">wallet address</label>
                        <InputText placeholder='Enter address' className="w-full mb-3" onChange={(e)=> {seWalletAddress(e.target.value)}}/>

                        <label className="block text-900 font-medium mb-2">beneficiary wallet address</label>
                        <InputText placeholder='Enter address' className="w-full mb-3" onChange={(e)=> {setBeneficiaryAddress(e.target.value)}}/>

                        <label  className="block text-900 font-medium mb-2">Release funds aftoer how many months</label>
                        <InputText keyfilter="int" placeholder='Release period' className="w-full mb-3" onChange={(e)=> {setNumberOfMonthsToStream(e.target.value)}}/>

                    </div>
                )}

                { section === 2 && (
                    <div>
                        <label className="block text-900 font-medium mb-2">Go back</label>
                        {/* <Editor placeholder="Put in a little code snippet to show the usage" value={usage} onTextChange={(e) => setUsage(e.textValue)} headerTemplate={header} style={{ height: '320px' }} /> */}
                        <Divider/>

                        <Button label="Submit" severity="primary" className="w-full" onClick={submissionButtonEventHandling} />

                    </div>
                )}

                    {section === 0 && (

                        <Button label="Next" severity="primary" className="w-full" onClick={nextSection} text icon='pi pi-arrow-circle-right'/>
                    )}
                    {section === 1 && (
                        <div className="flex align-items-center justify-content-center gap-5">
                            
                            <Button label="prevoiuse" severity="primary" onClick={()=>setSection(section -1)} text icon='pi pi-arrow-circle-left'/>
                            <Button label="Next" severity="primary" onClick={nextSection} text icon='pi pi-arrow-circle-right'/>
                        </div>
                    )}
                    {section === 2 && (
                        <div className="flex align-items-center justify-content-center gap-5">
                            <Button label="prevoiuse" severity="primary" onClick={()=>setSection(section -1)} text icon='pi pi-arrow-circle-left'/>
                            <Button label="go back" severity="primary"  onClick={()=> setSection(0)} text icon='pi pi-spinner'/>
                        </div>
                        
                    )}
      
            </Card>
        </div>
    </div>

  )
}

export default CreateForm