import { setToken } from "../config/token";
import { API_URL } from "../constants/global";

const signIn = async (email, password) => {
    fetch(API_URL + '/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("logged in")
      setToken(data.token)
      .then(() => {
        // navigation.navigate('HomePage')
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch((error) => {
      console.log("error logging in");
      console.error(JSON.stringify(error))
    });
}

export const authService = {
    signIn,
}