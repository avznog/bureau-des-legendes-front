import { createRefresh } from "react-auth-kit";
import axios from "../axios/axios";

const refreshApi = createRefresh({
  interval: 3600 * 24 * 7,
  refreshApiCallback: async ({
    authToken,
    refreshToken
  }) => {
    try {
      const response = await axios.post('/refresh', {"access_token": authToken, "refresh_token": refreshToken});
      
      return {
        isSuccess: response.data.isSuccess,
        newAuthToken: response.data.access_token,
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        newAuthToken: ''
      }
    }
  }
})

export default refreshApi;