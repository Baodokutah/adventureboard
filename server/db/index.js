mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected database successfully')
    }
    catch (err) {
        console.log('Error connecting to database: ' + err)
    }
}
module.exports = {connect}