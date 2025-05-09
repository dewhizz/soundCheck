import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importing necessary components from React Router
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayments';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Aboutus from './components/Aboutus';




function App() {
  return (
    <div className="App">
      <Router>  {/* Router wrapping the whole app */}
        <header className="App-header">
          <Navbar /> {/* Navigation Bar */}
        </header>

        {/* Define Routes */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/getproducts" element={<Getproducts />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/makepayment" element={<Makepayment />} />
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path='/aboutus' element={<Aboutus/>}/>
     
        </Routes>

        <Footer /> {/* Footer */}
      </Router>
    </div>
  );
}

export default App;
