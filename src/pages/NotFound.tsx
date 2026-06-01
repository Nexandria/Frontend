import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div>
      <h1>404 — Página no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </div>
  )
}
