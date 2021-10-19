const {Schema, model} = require('mongoose');

const roleSchema = Schema({
    name: String
},{
    versionKey: false
})  

module.exports = model('Role', roleSchema)
