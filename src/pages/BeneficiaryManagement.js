import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Editor } from 'primereact/editor';
import { Rating } from "primereact/rating";
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';

import { Toast } from 'primereact/toast';
import Blockies from 'react-blockies';

import { appStateService } from '../AppstateService/AppStateService';


const BeneficiaryManagement = () => {
    
    const [manageArray, setManageArray] = useState([]);
    const service = appStateService;
    const address = localStorage.getItem("userWalletAddress");
    console.log('address: ', address);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await service.getBeneficiaryFromRecord(service.walletAddress);
            setManageArray(data);
            console.log('from manage: ', data[0]);
            console.log('address: ', address);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array ensures this effect runs once on mount
      return (
        <div>
            <div className="bg-primary-800 text-gray-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap " style={{height:"12rem", background:`url(https://media.licdn.com/dms/image/D4E12AQGc2LEesn-HrQ/article-cover_image-shrink_720_1280/0/1681832199466?e=2147483647&v=beta&t=bJuX740RPF6GGjAshQAtlzVzKjOSMUmn5_ghvTOS0kQ)`}}>
            {/* <img src={data.image} style={{width:'180px', height:'180px', borderRadius:"20%", position:"relative", top:"45px"}}/> */}
            <div style={{borderRadius:"50%", position:"relative", top:"75px"}}> 
                <Blockies seed={'Manage'} size={25} scale={8} spotColor='#7ED7C1' color='#dfe' />
            </div>
        </div>  
        <div style={{height:"152px"}}></div>
          {/* Your existing JSX code */}
          {manageArray.length > 0 ? (
            // Render content using manageArray
            <div className="flex flex-wrap gap-1 md:gap-4 xl:gap-25">
              <Card title="Beneficiary " className="shadow-6 w-20rem" style={{ height: "420px" }}>
                {/* Render content based on manageArray */}
                <ul className="list-none p-0 m-0 flex-grow-1">
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-eye text-primary-500 mr-2"></i>
                    <span>{manageArray[0].benficiaryName}</span>
                  </li>
                  <Divider />
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-green-500 mr-2"></i>
                    <span>name</span>
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
            <Button  severity='info'  style={{position:"relative", left:"80%"}}> claim funds</Button>
            </Card>
            
      
              {/* Other JSX based on manageArray */}
              <div style={{height:"72px"}}></div>
            </div>
          ) : (
            // Render a loading state or a message indicating that data is being fetched
            <div>
                <Card title='There seems to be no data from your wallet'>
                    No data
                    <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
                </Card>

            </div>
          )}
          {/* The rest of your JSX code */}
          <div style={{height:"72px"}}></div>
        </div>
      );
}

export default BeneficiaryManagement