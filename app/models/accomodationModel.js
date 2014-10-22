
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AccomodationSchema = new Schema({
     "title"   : { type: String }, 
     "user_id" : { type: String },
     "body" : { type: String, default: '' },
     "post_date" : { type : Date, default: Date.now},
     "accomodationType": {type: String},//rent|wanted
     "hidden" : {type:Boolean, default: false }
});
mongoose.model('Accomodation', AccomodationSchema);