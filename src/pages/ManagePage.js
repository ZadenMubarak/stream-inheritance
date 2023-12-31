import React, { useState, useEffect, useRef } from 'react';
import { Message } from 'primereact/message';

import { Accordion, AccordionTab } from 'primereact/accordion';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';


import { Toast } from 'primereact/toast';
import Blockies from 'react-blockies';

import { appStateService } from '../AppstateService/AppStateService';

const ManagePage = () => {

  const [manageArray, setManageArray] = useState([]);
    const service = appStateService;
    const address = localStorage.getItem("userWalletAddress");
    console.log('address: ', address);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await service.getItemsFromRecord(service.walletAddress);
            setManageArray(data);
            console.log('from manage: ', data[0]);
            console.log('address: ', address);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array ensures this effect runs once on mount
      const msgs = useRef(null);
    
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
                  {manageArray.map((item, index) => (
                    <React.Fragment key={index}>
                      <li className="flex align-items-center mb-3">
                        <i className="pi pi-eye text-primary-500 mr-2"></i>
                        <span>{item.streamCreatorName}</span>
                      </li>
                      <Divider />
                      <span>Beneficiary names</span>
                      <li className="flex align-items-center mb-3">
                        <i className="pi pi-check-circle text-green-500 mr-2"></i>
                        <span>{item.benficiaryName}</span>
                      </li>
                      
                    </React.Fragment>
                  ))}


                </ul>
              </Card>
              <Card className='shadow-5' style={{width:'70%'}}>
            <span className="block text-2xl font-bold mb-1">Manage</span>
            
            <div className="card">
            <TabView>
                <TabPanel header="Details">
                  <Accordion>
                    accordion
                    {manageArray.map((item, index) => (
                      <AccordionTab key={index} header={`Beneficiary: ${item.benficiaryName}`}>
                        <span className="m-0">
                          Details: {item.beneficiaryDetails}
                        </span>
                        <Divider/>
                        <span className="m-0">
                          Beneficiary Address: {item.beneficiaryAddress}
                        </span>
                      </AccordionTab>
                    ))}
                  </Accordion>
                    
                </TabPanel>
                <TabPanel header="transaction">\
                     <Message
                      style={{
                          border: 'solid #696cff',
                          borderWidth: '0 0 0 6px',
                          color: '#696cff'
                      }}
                      className="border-primary w-full justify-content-start"
                      severity="info"
                      text='You may view  your transactions here'
                  />
                </TabPanel>

                <TabPanel header="stream">
                <Message
                      style={{
                        border: 'solid #696cff',
                        borderWidth: '0 0 0 6px',
                        color: '#696cff'
                      }}
                      className="border-primary w-full justify-content-start"
                      severity="info"
                      text='You may view  and edit the stream here (under construction)'
                  />
                </TabPanel>

            </TabView>
        </div>
            <div style={{height:"20px"}}></div>
            </Card>
            
      
              {/* Other JSX based on manageArray */}
              <div style={{height:"72px"}}></div>
            </div>
          ) : (
            // Render a loading state or a message indicating that data is being fetched
            <div>
              
                Loading...
                <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>

            </div>
          )}
          {/* The rest of your JSX code */}
          <div style={{height:"72px"}}></div>
        </div>
      );
}

export default ManagePage