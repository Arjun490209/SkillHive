import { useEffect } from 'react'
import axios from '../utils/axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const useGetCurrentUser = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get('/api/user/get-current-user')
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }

    fetchUser()
  }, [dispatch])
}

export default useGetCurrentUser
