const joi = require('@hapi/joi');
const { userIdSchema } = require('./schemaUsers')

const chatSchema = {
    user: userIdSchema
}