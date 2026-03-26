// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("http://localhost:5030/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userId,     // ✅ must match backend DTO field
          password: password
        })
      })

      // ✅ Backend returns 401 for wrong credentials
      if (!response.ok) {
        const msg = await response.text()
        setError(msg || "Invalid credentials!")
        return
      }

      const data = await response.json()
      console.log("Login successful:", data)

      // ✅ Save simple auth state (or replace with JWT later)
      localStorage.setItem("auth", "true")

      navigate("/dashboard")

    } catch (err) {
      console.error(err)
      setError("Unable to connect to server. Try again later.")
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Please sign in to continue</p>

          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-msg">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}