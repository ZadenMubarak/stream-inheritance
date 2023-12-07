import React, {useState, useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Editor } from 'primereact/editor';
import { Rating } from "primereact/rating";
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { Toast } from 'primereact/toast';
import Blockies from 'react-blockies';

import { AppStateService } from '../AppstateService/AppStateService';

const ManagePage = () => {

    const service = new AppStateService();
    service.getItemsFromRecord()
    const mangeArray = service.polyBaseResponse;

    console.log('manage: ',service.polyBaseResponse);
  return (
    <div>
        <div className="bg-primary-800 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap " style={{height:"12rem", background:`url(https://media.licdn.com/dms/image/D4E12AQGc2LEesn-HrQ/article-cover_image-shrink_720_1280/0/1681832199466?e=2147483647&v=beta&t=bJuX740RPF6GGjAshQAtlzVzKjOSMUmn5_ghvTOS0kQ)`}}>
            {/* <img src={data.image} style={{width:'180px', height:'180px', borderRadius:"20%", position:"relative", top:"45px"}}/> */}
            <div style={{borderRadius:"50%", position:"relative", top:"75px"}}> 
                <Blockies seed={'Manage'} size={25} scale={8} spotColor='#7ED7C1' color='#dfe' />
            </div>
        </div>  
        <div style={{height:"152px"}}></div>

        <div className="flex flex-wrap gap-1 md:gap-4 xl:gap-25">
        <div style={{height:"72px"}}></div>
            <Card title="Beneficiary " className='shadow-6 w-20rem' style={{height:"420px"}}>
                <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                        <i className="pi pi-eye text-primary-500 mr-2"></i>
                        <span>{mangeArray[0]}</span>
                    </li>
                    <Divider />
                    
                    <li className="flex align-items-center mb-3">
                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                        <span>0x5</span>
                    </li>
                </ul>
            </Card>

            <Card className='shadow-5' style={{width:'70%'}}>
            <span className="block text-2xl font-bold mb-1">Manage</span>
            
            <div className="card">
            <TabView>
                <TabPanel header="Details">
                    <p className="m-0">
                        long deets
                    </p>
                    <span>Rating  </span>  :<Rating value={5} readOnly cancel={false} />
                </TabPanel>
                <TabPanel header="transaction">
                    {/* <Editor value={usage} headerTemplate={header} readOnly style={{ height: '220px' }}/>
                     */}
                     <h1>eq</h1>
                </TabPanel>
                <TabPanel header="stream">
                    {/* <Editor value={usage} headerTemplate={header} readOnly style={{ height: '220px' }}/>
                     */}
                     <h1>eq</h1>
                </TabPanel>

            </TabView>
        </div>
            <div style={{height:"20px"}}></div>
            <Button  severity='primary'  style={{position:"relative", left:"80%"}}> subscribe </Button>
            </Card>
        </div>
        <div style={{height:"72px"}}></div>
    </div>
  )
}

export default ManagePage