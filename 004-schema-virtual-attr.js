var mongoose = require('mongoose'); //引用mongoose模块

var db = mongoose.createConnection('localhost', 'mongoose');

var PersonSchema = new mongoose.Schema({ name: { first: String, last: String } });
var PersonModel = mongoose.model('Person', PersonSchema);

var krouky = new PersonModel({
    name: { first: 'krouky', last: 'han' }
});

//定义虚拟属性
PersonSchema.virtual('name.full').get(function() {
    return this.name.first + ' ' + this.name.last;
});
// 反之通过full反解first和last属性
PersonSchema.virtual('name.full').set(function(name) {
    var split = name.split(' ');
    this.name.first = split[0];
    this.name.last = split[1];
});

//console.log(krouky.name.first + ' ' + krouky.name.last);
console.log(krouky.name.full);
console.log(krouky.name.first);