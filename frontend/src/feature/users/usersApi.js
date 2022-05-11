import { api } from '../../app/api'

export const fetchUsers = () => api.get('/users')
