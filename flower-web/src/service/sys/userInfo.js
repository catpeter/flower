import axios from 'axios'

export const login = (loginInfo) => axios.post('sys/userInfo/login', loginInfo)

export const getUserInfo = () => axios.get('sys/userInfo/getUserInfo')

export const getPrisons = () => axios.get('sys/prison/getPrisonList')

export default {
  login,
  getUserInfo,
  getPrisons
}
