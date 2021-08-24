const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelShema = new mongoose.Schema({
    idUser: String,
    status: String,
    images: [Object],
    category: String,
    price: String,
    description: String,
    dateCreated: Date,
    views: Number,
    status: Boolean
});

const modelName = 'Ad';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelShema);
}