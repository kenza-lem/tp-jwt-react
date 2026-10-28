import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
