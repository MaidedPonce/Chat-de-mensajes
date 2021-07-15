const MongoService = require('../../lib/mongo')
const bcrypt = require('bcryptjs')
class Users {
    constructor() {
        this.collection = 'users';
        this.mongo = new MongoService();
    }
    async getUsers({ email }) {
        const [user] = await this.mongo.getAll(this.collection, { email })
        return user;
    }
    async createUser({ user }) {
        const { name, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await this.mongo.create(this.collection, {
            name,
            email,
            password: hashedPassword
        })
        return createUser;
    }
    async getOrCreateUser({ user }) {
        const querieUser = await this.getUsers({email: user.email})
        if(querieUser){
            return querieUser;
        }
        await this.createUser({ user })
        return await this.getUsers({email: user.email})
    }
}

module.exports = Users;