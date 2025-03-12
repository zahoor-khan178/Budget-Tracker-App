import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Updated imports

import TransactionsForm from './Application/components/TransactionsForm';  // Correct import
import Nav from './Application/components/Nav'; 
import Transaclist from './Application/components/Transclist'; 
import Summary from './Application/components/Summary'; 

const App = () => {
    return (
        <Router>
        <div style={{ display: 'flex' }}>
                <Nav />
                <div style={{ marginLeft: '250px', padding: '20px', width:'100%' }}>
                    
                    <Routes>
                      
                        <Route path="/" element={<Summary/>} />
                        <Route path="/transaction" element={<TransactionsForm />} />
                        <Route path="/view-transaction" element={<Transaclist/>} />
                    </Routes>
                    
                </div>
            </div>
        </Router>
    );
};

export default App;
