const store = require('./store')

function chatList(userId) {
    return store.list(userId)
   }

   function createChat(users){
    if( !users || !Array.isArray(users)){
        return Promise.reject('No hay ningún chat por el momento') /**Si el usuario es un array*/
    }
    const chat = {
        users: users,
    }
    return store.add(chat)
    }

    module.exports = {
        chatList,
        createChat,
    }

    