import AppRoutes from './AppRoutes'
import './app.css'

export const App = () => {
  return (
    <div
      className="container d-flex align-items-center justify-content-center w-100 h-100 text-center flex-column gap-2 overflow-auto mw-100 p-0"
    >
      <AppRoutes/>
    </div>
  )
}
