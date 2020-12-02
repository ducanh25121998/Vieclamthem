// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var listjobSchema = mongoose.Schema({
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
        CountApply:String,
       
})
listjobSchema.index({
        NameJob: 'text',
        Address: 'text',
}, {
  weights: {
    name: 5,
    description: 1,
  },
});
module.exports = mongoose.model('listjob', listjobSchema);
