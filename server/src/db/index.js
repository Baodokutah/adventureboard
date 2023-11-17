mongoose = require('mongoose');

const connect = async () => {
    try {
        const url = "mongodb://127.0.0.1:27017/DACNPM"
        await mongoose.connect(url)
        console.log('Connected database successfully')
    }
    catch (err) {
        console.log('Error connecting to database: ' + err)
    }
}
module.exports = {connect}