import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Profile() {
  const [hello, setHello] = useState('')
  const [profile, setProfile] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const [helloResponse, profileResponse] = await Promise.all([
          api.get('/api/hello'),
          api.get('/api/profile'),
        ])
        setHello(helloResponse.data)
        setProfile(profileResponse.data)
      } catch (err) {
        if (err.response?.status === 401) {
          // Token expire ou invalide : on repart sur la connexion.
          localStorage.removeItem('token')
          navigate('/login')
        } else {
          setError('Impossible de charger le profil')
        }
      }
    }
    loadData()
  }, [navigate])

  return (
    <div style={{ width: '100%', maxWidth: 360, padding: 24, background: '#fff', borderRadius: 8 }}>
      <h1>Profil</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <p>{hello}</p>
      <p>{profile}</p>
      <button type="button" onClick={logout}>Se déconnecter</button>
    </div>
  )
}

export default Profile
