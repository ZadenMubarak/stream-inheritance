import React, { useState, useRef } from "react";

import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";

import { AppStateService } from "../AppstateService/AppStateService";

const CreateForm = () => {
    const [section, setSection] = useState(0);
    const [streamCreatorName, setStreamCreatorName] = useState('');
    const [benficiaryName, setBenficiaryName] = useState('');
    const [walletAddress, seWalletAddress] = useState('');
    const [numberOfMonthsToStream, setNumberOfMonthsToStream] = useState('');
    const [beneficiaryDetails, setBeneficiaryDetails] = useState('');
    const [usage, setUsage] = useState('');
    const [checked, setChecked] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [chainlink, setChinlink] = useState(false);
    const [ethereum, setEthereum] = useState(false);
    const [polygon, setPolygon] = useState(false);
    const [bnb, setBNB] = useState(false);
    const [arbutrium, setArbitrium] = useState(false);
    const [avalanche, setAvalanche] = useState(false);
    const [optimism, setOptimism] = useState(false);
    // chainlikn eth polygon bnb arbitrium avalanchel optimism
    const toast = useRef(null);
    const service = new AppStateService();

    const IdArray = service.polyBaseResponse;

    const submissionButtonEventHandling = () => {
        if (!streamCreatorName || !benficiaryName || !walletAddress || !beneficiaryDetails || !usage || !numberOfMonthsToStream) {
            toast.current.show({severity:'error', summary: 'Incomplete', detail:' Please fill in all the prompts', life: 3000});

        }else {
            toast.current.show({severity:'success', summary: 'Success', detail:'Form successfully submitted', life: 3000});
            const db_values = {
                id: IdArray.length + 1,
                streamCreatorName: streamCreatorName,
                benficiaryName: benficiaryName,
                beneficiaryDetails: beneficiaryDetails,
                numberOfMonthsToStream: numberOfMonthsToStream,
                walletAddress: walletAddress,
            }

            service.createProject(db_values);
 
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

                        <label  className="block text-900 font-medium mb-2">Release funds aftoer how many months</label>
                        <InputText keyfilter="int" placeholder='Release period' className="w-full mb-3" onChange={(e)=> {setNumberOfMonthsToStream(e.target.value)}}/>

                        <label  className="block text-900 font-medium mb-2">select a chain</label>
                        {/* chainlink */}
                        <div className="">
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setChinlink(e.checked)} checked={chainlink} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/chainlink-link-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                chainlink
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/* ethereum */}
                        <div className="">
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setEthereum(e.checked)} checked={ethereum} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                ethereum
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/* polygon */}
                        <div className="">
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setPolygon(e.checked)} checked={polygon} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                polygon
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/* bnb */}
                        <div className="flex align-items-center">  
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setBNB(e.checked)} checked={bnb} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                BNB
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/*arbitrium */}
                        <div className="flex align-items-center">  
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setArbitrium(e.checked)} checked={arbutrium} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                arbitrium
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/*avalanche*/}
                        <div className="flex align-items-center">  
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setAvalanche(e.checked)} checked={avalanche} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                avalnche
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/*optimism*/}
                        <div className="flex align-items-center">  
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setChecked(e.checked)} checked={checked} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                optimism
                            </label>
                        </div>

                    </div>
                )}

                { section === 2 && (
                    <div>
                        <label className="block text-900 font-medium mb-2">Usage</label>
                        <Editor placeholder="Put in a little code snippet to show the usage" value={usage} onTextChange={(e) => setUsage(e.textValue)} headerTemplate={header} style={{ height: '320px' }} />
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