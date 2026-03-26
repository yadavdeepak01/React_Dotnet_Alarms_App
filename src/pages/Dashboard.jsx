import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'
import './Dashboard.css'            // ⬅️ page-specific styles

const FILES = {
  raw: '/data/raw-alarms.xls',
  configured: '/data/configured-alarms.xls',
}

export default function Dashboard() {
  const navigate = useNavigate()

  const [active, setActive] = useState('raw')   // 'raw' | 'configured'
  const [rows, setRows] = useState([])
  const [cols, setCols] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load data on active tab
  useEffect(() => {
  let cancelled = false;

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const apiUrl =
        active === "raw"
          ? "http://localhost:5030/api/alarm/raw"
          : "http://localhost:5030/api/alarm/configured";

      const res = await fetch(apiUrl);

      if (!res.ok) throw new Error("Failed to load data");

      const json = await res.json();

      if (!cancelled) {
        setRows(json);
        setCols(json.length ? Object.keys(json[0]) : []);
      }
    } catch (e) {
      if (!cancelled) {
        setError(e.message || "Failed to fetch");
      }
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  loadData();
  return () => (cancelled = true);
}, [active]);

  // 🔒 Logout handler
  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate('/login', { replace: true })
  }

  return (
    <div className="dash-page">
      {/* Top bar with heading on left & logout on right */}
      <div className="dash-topbar">
        <h1 className="dash-title"><u>Alarm Statistics</u></h1>

        <div className="dash-actions">
          {/* tabs */}
          <div className="dash-tabs">
            <button
              className={`tab-btn ${active === 'raw' ? 'active' : ''}`}
              onClick={() => setActive('raw')}
            >
              Raw Alarms
            </button>
            <button
              className={`tab-btn ${active === 'configured' ? 'active' : ''}`}
              onClick={() => setActive('configured')}
            >
              Configured Alarms
            </button>
          </div>

          {/* logout at the extreme right */}
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                {cols.map((c) => <th key={c}>{c.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  {cols.map((c) => <td key={c}>{String(r[c] ?? '')}</td>)}
                </tr>
              ))}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="muted" style={{ padding: 16 }}>
              No rows found in the first sheet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}