const config = {
  dbUrl: process.env.DB_URL || 'mongodb+srv://maidedhp:huachikk201@cluster0.3xupg.mongodb.net/test',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  filesRoute: process.env.FILES_ROUTE || 'files'
}

module.exports = { config }
