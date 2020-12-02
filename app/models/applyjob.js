// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var applySchema = mongoose.Schema({
            title:String,
            IdJob : String,
            linhvuc : String ,
            loaihinh :String,
            Namecompany : String,
            NameJob :String,
            Address :String,
            idpost :String,
            ImageCompany : String,
            Detail :String ,
            DetailCompany :String,
            Phone : String,
            Email :String ,
            TimecreatPostDay : String,
            TimecreatPostHour : String,
            TimecApplyDay : String,
            IdNTV : String,
            EmailNTV: String,
            FullnameNTV:String,
});
 
// create the model for users and expose it to our app
module.exports = mongoose.model('apply', applySchema);
