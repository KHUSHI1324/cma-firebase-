// import logo from './logo.svg';
import './App.css';
import ChatPages from "./Pages/ChatPages";
import Register from './Pages/Register';
import Login from './Pages/Login';
import {useContext} from 'react';
import {AuthContext} from './Context/AuthContext';
import {Routes,Route, BrowserRouter,Navigate} from 'react-router-dom';
function App() {
  const {currentUser}=useContext(AuthContext)
  const ProtectedRoute  =({children})=>{
    if(!currentUser){
      return <Navigate to='/login'/>
    }
    return children;
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'>
      <Route index element={<ProtectedRoute><ChatPages/></ProtectedRoute>} />
    <Route path='login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>
      </Route>  
    </Routes> 
    </BrowserRouter>
  );
}

export default App;
