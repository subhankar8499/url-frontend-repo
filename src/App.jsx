import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Analytics from './pages/Analytics/Analytics';
import CreateLink from './pages/CreateLink/CreateLink';
import Profile from './pages/Profile/Profile';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/create" element={<CreateLink />} />
          <Route path="/edit/:id" element={<CreateLink />} />
          <Route path="/profile" element={<Profile />} />

          {/* Default Route */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;