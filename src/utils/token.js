let token = JSON.parse(localStorage.getItem("user"))?.token
const setToken = (usertoken)=>{
    token=token?token:usertoken
}
export default setToken
export {token}