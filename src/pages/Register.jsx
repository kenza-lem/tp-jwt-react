import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleForm = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/register', { email, password })
      navigate('/login')
    } catch (err) {
      if (!err.response) {
        setError('Serveur injoignable')
      } else if (typeof err.response.data === 'string' && err.response.data) {
        setError(err.response.data)
      } else {
        setError('Email et mot de passe invalides')
      }
    }
  }

  return (
    <form onSubmit={handleForm}>
      <h1>Inscription</h1>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Mot de passe
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      {error && <p style={{ color: 'crimson', margin: 0 }}>{error}</p>}
      <button type="submit">Créer le compte</button>
      <p style={{ margin: 0 }}>
        Déjà inscrit ? <Link to="/login">Se connecter</Link>
      </p>
    </form>
  )
}

export default Register
