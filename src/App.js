
import './App.css';
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home/Home';
import PropertyList from './components/Propertys/PropertyList';
import Login from './components/Auth/Login';
import Traitement from './components/Profile/Traitement';
import Authorization from './services/Authorisation';
import ShowProperty from './components/Propertys/ShowProperty';
import Contact from './layouts/Contact';
import Register from './components/Auth/Register';
import TransactionsHistory from './components/Profile/TransactionsHistory';
import PropertiesAdmin from './pages/PropertiesAdmin';
import TraitementsAdmin from './pages/TraitementsAdmin';
import Dashboard from './pages/Dashboard';
import AddProperty from './pages/AddProperty';
import ContactAdmin from './pages/ContactsAdmin';
import UsersAdmin from './pages/UsersAdmin';
import PrivateRoute from './services/PrivateRoute';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div>
   
     <Routes>
      {/* publique route */}
      <Route  path='/'  element= {<Home />} />
       <Route  path='/login'  element= {<Login />} />
       <Route  path='/register'  element= {<Register />} />
      <Route  path='/properties'  element= {<PropertyList />} />
      <Route  path='/contact'  element= {<Contact />} />
      <Route  path='/properties/:propertyId'  element= {<ShowProperty />} />
      <Route  path='/profile/transactionsHistory'  element= {<TransactionsHistory />} />
      <Route  path='/profile'  element= { <Profile />} />
      
        {/* admin routes protégées */}
   <Route
     path="/admin"
     element={
     <PrivateRoute>
      <Dashboard />
     </PrivateRoute>
   }
  />

 <Route
    path="/admin/properties"
    element={
    <PrivateRoute>
      <PropertiesAdmin />
    </PrivateRoute>
   }
  />

  <Route
      path="/admin/traitements"
      element={
      <PrivateRoute>
      <TraitementsAdmin />
      </PrivateRoute>
    }
  />

    <Route
      path="/admin/add-property"
      element={
      <PrivateRoute>
      <AddProperty />
     </PrivateRoute>
    }
   />

   <Route
      path="/admin/contacts"
      element={
      <PrivateRoute>
      <ContactAdmin />
      </PrivateRoute>
    }
   />

   <Route
      path="/admin/users"
      element={
      <PrivateRoute>
      <UsersAdmin />
     </PrivateRoute>
    }
  />
  
      <Route  path='/profile/traitement'  element= {
         <Authorization>
            <Traitement />
         </Authorization>
        } />

     </Routes>
     
    </div>
  );
}

export default App;
