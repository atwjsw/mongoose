var mongoose = require('mongoose'); //引用mongoose模块
var db = mongoose.createConnection('localhost', 'abc');

/*db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
    //一次打开记录
    console.log("一次打开记录");
});*/

var PersonSchema = new mongoose.Schema({ name: String, type: String });
//实例方法。查询类似数据
PersonSchema.methods.findSimilarTypes = function(cb) {
    return this.model('Person').find({ type: this.type }, cb);
};
//静态方法
PersonSchema.statics.findByName = function(name, cb) {
    this.find({ name: new RegExp(name, 'i')}, cb );
    
};

var PersonModel = db.model('Person',PersonSchema);
// var PersonModel = db.model('Person', PersonSchema);
var krouky = new PersonModel({ name: 'krouky', type: '前端工程师' });
var friend = new PersonModel({ name: 'friend', type: '前端工程师' });
//krouky.save();
//friend.save();
krouky.findSimilarTypes(function(err, persons) {
    //persons中就能查询到其他前端工程师
    persons.forEach(function(item) {
    	console.log(item.name);
    });
});

// 静态方法在Model层就能使用
PersonModel.findByName('krouky', function(err, persons) {
    //找到所有名字叫krouky的人
    persons.forEach(function(item) {
    	console.log(item.name);
    });
});

var PersonSchema = new Schema({
      name:{
        first:String,
        last:String
      }
    });
    var PersonModel = mongoose.model('Person',PersonSchema);
    var krouky = new PersonModel({
      name:{first:'krouky',last:'han'}
    });