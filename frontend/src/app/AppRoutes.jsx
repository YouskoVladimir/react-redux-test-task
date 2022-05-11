import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { UsersPage } from '../pages/UsersPage'
import { Page404 } from '../pages/Page404'

const AppRoutes = () => {
  return (
    <Routes path="/">
      <Route path="/" element={<HomePage/>}/>
      <Route path="users" element={<UsersPage/>}/>
      <Route path="*" element={<Page404/>}/>
    </Routes>
  )
}

export default AppRoutes
