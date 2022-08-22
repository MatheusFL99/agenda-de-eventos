import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Calendar from './components/Calendar'
import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Message from './components/layout/Message'
import { UserProvider } from './context/UserContext'

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ProtectedRoutes from './ProtectedRoutes'
import Dashboard from './pages/Events/Dashboard'
import EditEvent from './pages/Events/EditEvent'
import AddEvent from './pages/Events/AddEvent'

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <UserProvider>
            <Navbar />
            <Message />
            <Container>
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<Calendar />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/events/new" element={<AddEvent />} />
                  <Route path="/event/edit/:id" element={<EditEvent />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Container>
          </UserProvider>
        </Router>
      </div>
    </>
  )
}

export default App
