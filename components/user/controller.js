const store = require('./store')

function addUser(name){
    if( !name ){
        return Promise.reject('Invalid name') /**Esto devolvería
        una promesa rechazada así que en nuestro network.js 
        podemos recoger el catch
        Seguimos devolviendo una promesa aquí y aquí:
        return store.add(user) */
    }
    const user = {
        name,
    }
    return store.add(user)/**Aquí será rechazada o no según lo que
    sucede en la base de datos */
}

function listUsers() {
    return store.list /**Va a devolver el store.list
    Va a devolver directamente al store.list,
    no hay ningún parametro a comprobar */
   }



module.exports = {
    addUser,
    listUsers,
}