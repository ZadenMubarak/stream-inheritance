// import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";            
import 'primeicons/primeicons.css';    

import Navbar from './components/NavbarComponent';
import HomePage from './pages/HomePage';
import ManagePage from './pages/ManagePage';
import CreateForm from './pages/CreateForm';

import { appStateService } from './AppstateService/AppStateService';

function App() {

  let service = appStateService;
  console.log(service.walletAddress);

  return (
    <div className="App">
      <BrowserRouter> 
      <Navbar/>
      {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/manage' element={<ManagePage/>} />
          <Route path='/create-form' element={<CreateForm/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
