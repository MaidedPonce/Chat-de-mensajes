// Modelo de nuestra base de datos
const mongoose = require('mongoose')

/** Separarnos desde mongoose
 * la clase "esquema"
 *
 * ¿Por qué la vamos a separar?
 * Porque esta va a ser una de las clases
 * que más utilicemos
 */

const Schema = mongoose.Schema

/** Vamos a crear nuestro esquema
  * Este esquema va a ser un esquema de mongoose
  * y va a hacer, a traves de un objeto,
  * podemos definir todas las propiedades
  * y los tipos que queramos tener, por ejemplo,
  * en controller.js estabamos diciendo que en
  * user: user => va a ser un STRING, entonces
  * así lo vamos a aplicar
 */
const mySchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  date: Date,
  file: String
  // Con esto, ya estamos diciendo qué tipo de información vamos almacenar
})

/** Cómo nos traemos este esquema y cómo lo utilizamos
  * dentro de nuestro software, arquitectura.
  * Pues nos traemos un MODEL, lo que va a hacer
  * es reconocer este esquema,
  * y que haga que todo lo que se cree tenga este
  * esquema y se guarde en la BD con este nombre.
  * En este caso lo que queremos traer aquí son ´
  * los mensajes, entonces:
  */

/** Cómo se va a llamar nuestra colección en mongo
   * que es equivalente a las tablas de mysql,
   * osea, el tipo de datos que vamos a tener : 'Message
   * Y el segundo el esquema que le hemos pasado: mySchema
   *
   * Y este modelo va a ser el que vamos a utilizar siempre
   * cuando queramos hacer cualquier tipo de moficiación
   * sobre la base de datos exclusivamente sjhdndss mensajes :D
   * Asi que vamos a exportarlo
   */

const model = mongoose.model('messages', mySchema)
module.exports = model

/** Lo primero que vamos hacer es almacenar la
   * informacion
   * , entonces vamos a enviar el mock que
   * habiamos generado en store.js, por uno real
   * entonces nos traemos mongoose db (store.js)
   */
