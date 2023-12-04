import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';

import Lottie from 'lottie-react';
import animationData from '../components/Assets/tech-people.json';

const HomePage = () => {
    const navigate = useNavigate();

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
      
  
      </div>
    )
}

export default HomePage