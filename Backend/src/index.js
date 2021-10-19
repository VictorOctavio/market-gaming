require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connection Success');

    app.listen(app.get('port'), () => {
        console.log(`Server on port: ${app.get('port')}`)
    })
})
.catch(err => console.log(err))