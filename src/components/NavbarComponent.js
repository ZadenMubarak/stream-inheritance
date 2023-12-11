import React, {useState} from 'react'

// import { useNavigate, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './Assets/logo.svg'

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

import { appStateService } from '../AppstateService/AppStateService';

const Navbar = () => {
    const navigate = useNavigate();
    let service = appStateService;
    const [buttonText, setButtonText] = useState("Connect Wallet");

    const connect = () => {
        service.connectToMetaMask()
        setButtonText('connected')
    }

    const startContent = (
        <React.Fragment>
            <Button className="" onClick={()=> navigate('/')} text >
                <img src={logo} style={{width:"12%", height:"8%"}} alt='logo'/>
                <span className='flex pr-2 pt-1 block text-1xl font-bold mb-1 text-blue-600'>Stream inherritance</span>
            </Button>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <a href='/#how-it-works'>

            <Button label='How it works' className="mr-2" text/>
            </a>
            <Button label='create' className="mr-2" text onClick={() => navigate('/create-form')}/>
            <Button label='manage' className="mr-2" text onClick={() => navigate('/manage')}/>
            <Button label={buttonText} className="mr-2" icon='pi pi-wallet' onClick={connect}/>
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar start={startContent} end={endContent} />
        </div>
    );
}

export default Navbar