
import './App.css';

import Analytics from './components/index'

//import {Link} from 'react-router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      National Wise COVID -19 Data for India

      </header>
      <Analytics />
      <footer className="footer">
        <div> 

       <span>To know about source of data </span> 
       
        <a href="https://api.covid19india.org"  target="_blank">Click Here</a> 
        <span style={{paddingLeft:"5px"}}> To know about other information </span> <a href="https://www.narayanahealth.org/blog/coronavirus-testing-how-to-test/"  target="_blank"> Click Here </a> 
        
                </div>
      </footer>
    </div>
  );
}

export default App;
