import Cookies from 'js-cookie'

export const setSessionCookie = async session => {
    Cookies.remove('session')
    Cookies.set('session', session, {expires:14})
    return await new Promise((resolve, reject)=>{
        const session = getSessionCookie()
        if(session !== undefined){
            resolve({isSuccess:true})
        }else{
            reject({isSuccess:false})
        }
    })
}

export const resetSessionCookie = async () => {
    Cookies.remove('session')
    return await new Promise((resolve, reject) => {
        const session = getSessionCookie()
        if(session.name === undefined){
            resolve({isReset: true})
        }else{
            reject({isReset: false})
        }
    })
}

export const getSessionCookie = () => {
    const sessionCookie = Cookies.get('session')
    if(sessionCookie === undefined){
        return {}
    }else{
        return JSON.parse(sessionCookie)
    }
}