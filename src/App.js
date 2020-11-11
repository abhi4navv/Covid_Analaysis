
import './App.css';

import Analytics from './components/index'

function App() {
  return (
    <div className="App">
      <Analytics/>
    </div>
  );
}
const cors = require('cors')

App.use(cors())
export default App;
