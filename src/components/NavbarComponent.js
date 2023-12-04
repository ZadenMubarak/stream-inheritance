import React from 'react'

// import { useNavigate, Link } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import logo from './Assets/logo.svg'

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';

const Navbar = () => {
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://reactjs.org/'
            }
        },
        {   label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                //router.push('/fileupload');
            }
        }
    ];

    const startContent = (
        <React.Fragment>
            <Button className="" text >
                <img src={logo} style={{width:"12%", height:"8%"}} />
                <span className='flex pr-2 pt-1 block text-1xl font-bold mb-1 text-blue-600'>Stream inherritance</span>
            </Button>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <a href='#how-it-works'>

            <Button label='How it works' icon="pi pi-search" className="mr-2" text/>
            </a>
            <Button label='connect' icon="pi pi-calendar" className="mr-2" text/>
            <Button label='manage' icon="pi pi-times" className="mr-2" text/>
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar start={startContent} end={endContent} />
        </div>
    );
}

export default Navbar