const MongoLib = require('../../lib/mongo')

class getApiKey {
  constructor () {
    this.collection = 'api-keys'
    this.mongoDb = new MongoLib()
  }

  async getApyKey ({ token }) {
    const [apiKey] = await this.mongoDb.getAll(this.collection, { token })
    //console.log(apiKey)
    return apiKey
  }
}

module.exports = getApiKey
