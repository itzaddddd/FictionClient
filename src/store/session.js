export const setSessionCookie = async (name, session) => {
    localStorage.setItem(name,session)
    return await new Promise((resolve, reject) => {
        const item = localStorage.getItem(name)
        if(item !== undefined){
            resolve({isSuccess: true})
        }else{
            reject({isSuccess: false})
        }
    })
}

export const resetSessionCookie = async name => {
    localStorage.removeItem(name)
    return await new Promise((resolve, reject) => {
         const item = localStorage.getItem(name)
         if(item !== undefined){
             resolve({isReset: true})
         }else{
             reject({isReset: false})
         }
    })
}

export const getSessionCookie = name => {
    const item = localStorage.getItem(name)
    if(item === undefined){
        return {}
    }else{
        return JSON.stringify(item)
    }
}

export const clearSessionCookie = async () => {
    localStorage.clear()
    return await new Promise((resolve, reject) => {
        const itemLength = localStorage.length
        if(itemLength === 0){
            resolve({isClear: true})
        }else{
            reject({isClear: false})
        }
   })
}