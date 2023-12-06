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

import { SiChainlink } from "react-icons/si";

const CreateForm = () => {
    const [section, setSection] = useState(0);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [functionContractAddress, seFunctionContractAddress] = useState('');
    const [creatorAddress, setCreatoAddress] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [usage, setUsage] = useState('');
    const [checked, setChecked] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const toast = useRef(null);

    let yes = '';
    let paid = '';
    const submissionButtonEventHandling = () => {
        if (!title || !author || !functionContractAddress || !longDescription || !usage || !creatorAddress) {
            toast.current.show({severity:'error', summary: 'Incomplete', detail:' Please fill in all the prompts', life: 3000});

        }else {
            toast.current.show({severity:'success', summary: 'Success', detail:'Form successfully submitted', life: 3000});
 
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
                    <InputText placeholder='Enter your name' className="w-full mb-3" onChange={(e)=> {setTitle(e.target.value)}}/>

                    <label className="block text-900 font-medium mb-2">Beneficiary name</label>
                    <InputText placeholder='Enter beneficiary name' className="w-full mb-3" onChange={(e)=> {setAuthor(e.target.value)}}/>
                </div>
                )}

                { section ===1 && (
                    <div>
                        <label className="block text-900 font-medium mb-2">long description</label>
                        <InputTextarea placeholder='long details' className="w-full mb-3" onChange={(e)=> {setLongDescription(e.target.value)}}/>

                        <label className="block text-900 font-medium mb-2">Email Address</label>
                        <InputText placeholder='Contract Address' className="w-full mb-3" onChange={(e)=> {seFunctionContractAddress(e.target.value)}}/>

                        <label  className="block text-900 font-medium mb-2">Number of months to stream</label>
                        <InputText keyfilter="int" placeholder='Creator Address' className="w-full mb-3" onChange={(e)=> {setCreatoAddress(e.target.value)}}/>

                        <label  className="block text-900 font-medium mb-2">select a chain</label>
                        {/* chainlink */}
                        <div className="">
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setIsPaid(e.checked)} checked={isPaid} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/chainlink-link-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                {isPaid ? paid='yes': paid='no'}
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/* ethereum */}
                        <div className="">
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setIsPaid(e.checked)} checked={isPaid} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                {isPaid ? paid='yes': paid='no'}
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/* polygon */}
                        <div className="">
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setIsPaid(e.checked)} checked={isPaid} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                {isPaid ? paid='yes': paid='no'}
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/* bnb */}
                        <div className="flex align-items-center">  
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setChecked(e.checked)} checked={checked} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                {isPaid ? paid='yes': paid='no'}
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/*arbitrium */}
                        <div className="flex align-items-center">  
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setChecked(e.checked)} checked={checked} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                {isPaid ? paid='yes': paid='no'}
                            </label>
                        </div>

                        <div className="h-1rem"></div>
                        {/*avalanche*/}
                        <div className="flex align-items-center">  
                            <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" onChange={e => setChecked(e.checked)} checked={checked} />
                            <label htmlFor="ingredient2" className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="20" height="20">
                                    <image xlinkHref="https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029" width="64" height="64" />
                                </svg>
                                {isPaid ? paid='yes': paid='no'}
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
                                {isPaid ? paid='yes': paid='no'}
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