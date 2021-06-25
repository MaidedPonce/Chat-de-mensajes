const MongoLib = require('../../lib/mongo/mongo')

class getApiKey {
  constructor () {
    this.collection = 'api-keys'
    this.mongoDb = new MongoLib()
  }

  async getApyKey ({ token }) {
    const [apiKey] = await this.mongoDb.getAll(this.collection, { token })
    return apiKey
  }
}

module.exports = getApiKey
