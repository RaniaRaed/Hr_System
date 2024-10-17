import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login Folder/Login';
import Forgetpass from './components/Forgetpass Folder/Forget'; // Correct path


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgetpass />} />
      </Routes>
    </Router>
  );
}

export default App;
