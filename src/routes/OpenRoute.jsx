import {Navigate} from 'react-router-dom'

const OpenRoute = ({children}) => {

    const token = JSON.parse(localStorage.getItem("user"))?.token
  return (
    token===undefined?children:(<Navigate to="/" replace={true} />)
  )
}

export default OpenRoute