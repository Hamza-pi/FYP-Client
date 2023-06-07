import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const token = JSON.parse(localStorage.getItem("user"))?.token
  return (
    token!==undefined?children:(<Navigate to="/login" replace={true} />)
  )
}

export default ProtectedRoute