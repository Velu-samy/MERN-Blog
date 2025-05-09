const mongoose = require('mongoose');
const Contact = new mongoose.Schema({
 username:{type:String,require:true},
email:{type:String,require:true}, 
 query:{type:String,require:true}

});

module.exports = mongoose.model("contact",Contact);