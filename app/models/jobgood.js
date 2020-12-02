// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var hotCompanySchema = mongoose.Schema({
        IdJob : String,
        Namecompany : String,
        linhvuc : String,
        hinhthuc : String,
        NameJob :String,
        Address :String,
        Email: String,
        ImageCompany : String
});
 
// create the model for users and expose it to our app
module.exports = mongoose.model('hotCompany', hotCompanySchema);
