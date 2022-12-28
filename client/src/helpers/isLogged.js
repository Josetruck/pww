import Cookies from 'universal-cookie'

export const isLogged = () => {
    const cookies = new Cookies()
    const session = cookies.get('session')
    if(session){
        return true
    }
    return false;
  }
