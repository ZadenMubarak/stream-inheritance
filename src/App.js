import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";            
import 'primeicons/primeicons.css';    

import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={<HomePage/>} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
