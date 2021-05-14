const config = {
  /** Podemos configurar todo lo que tengamos */
  /** Otra cosa que puedo hacer es setear.
   * O sea esto por defecto, pero puedo tenerlo desde
   * las variables de entorno, entonces yo puedo decir:
   * process.env.COMO LO QUIERA LLAMAR para acceder a las variables de entorno
   * Una buena practica es llamar las variables de entorno
   * con mayúsculas y separado con guión bajo
   * De esta manera si hay una configuracion de entorno
   * que sobre escriba esto, la sobrescribira
   * en una variable de entornpo
   * y si no utilizara mi variable
   * El puerto es muy tipico que lo tengamos en variables
   * de entorno
   */
  dbUrl: process.env.DB_URL || 'mongodb+srv://maidedhp:huachikk201@cluster0.3xupg.mongodb.net/test',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  filesRoute: process.env.FILES_ROUTE || 'files'
}

module.exports = { config }
