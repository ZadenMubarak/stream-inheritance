import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Timeline } from 'primereact/timeline';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import Lottie from 'lottie-react';
import animationData from '../components/Assets/tech-people.json';

const HomePage = () => {
    const navigate = useNavigate();
    const events = [
        { status: 'create profile', date: '15/10/2020 10:30', icon: 'pi pi-user', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'generate smart wallet', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'beneficiary details', date: '15/10/2020 16:15', icon: 'pi pi-money-bill', color: '#FF9800' },
        { status: 'setup stream payment', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' },
        { status: 'move assets and relax', date: '16/10/2020 10:00', icon: 'pi pi-send', color: '#00BCD4' } // Change color here
    ];
    const customizedMarker = (item) => {
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        );
    };

    return (
      <div>
    
          <div className="grid grid-nogutter surface-0 text-800">
              <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                  <section>
                      <span className="block text-6xl font-bold mb-1">get your assets safely to your loved</span>
                      <div className="text-6xl text-primary font-bold mb-3">ones when the unfortunate happens</div>
                      <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  
                      <Button label="get started" type="button" className="mr-3 p-button-raised" onClick={()=> navigate('/view-functions-cards')}/>
  
                  </section>
              </div>
              <div className="col-12 md:col-6 overflow-hidden">
                  {/* <img src="https://appdevelopermagazine.com/scripts/resize/?path=/multimedia/Using-smart-contracts-to-improve-data-management_tbo7l3y0.jpg&width=600" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} /> */}
                  <Lottie animationData={animationData} style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }}/>
              </div>
          </div>
          <Divider/>
          <div style={{height:"80px"}}></div>
          <div id='how-it-works'>

            <div className='flex align-items-center justify-content-center card'>

            <Card title="How it works" className='shadow-6' style={{width:"98%"}}>
              <Timeline value={events} align="alternate" content={(item) => item.status}  marker={customizedMarker}/>
            </Card>
            </div>

          </div>
          <div style={{height:"90px"}}></div>
      
  
      </div>
    )
}

export default HomePage