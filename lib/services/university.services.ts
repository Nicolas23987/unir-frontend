import axios from "axios"
import { publicApi } from "../http/public-api"


export const getUniversities = async () => {
  try {
    const { data } = await axios.get('http://localhost:3001/api/v1/university')
    console.log(data.data)
    return data
  } catch (error) {
    console.error('Error fetching universities:', error)
    throw error
  }
} 