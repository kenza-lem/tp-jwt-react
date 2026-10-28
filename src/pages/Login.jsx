import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleForm = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', response.data.token)
      navigate('/profile')
    } catch (err) {
      if (!err.response) {
        setError('Serveur injoignable')
      } else if (err.response.status === 401) {
        setError('Identifiants incorrects')
      } else {
        setError('Email et mot de passe invalides')
      }
    }
  }

  return (
    <form onSubmit={handleForm}>
      <h1>Connexion</h1>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Mot de passe
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      {error && <p style={{ color: 'crimson', margin: 0 }}>{error}</p>}
      <button type="submit">Se connecter</button>
      <p style={{ margin: 0 }}>
        Pas de compte ? <Link to="/register">Créer un compte</Link>
      </p>
    </form>
  )
}

export default Login
