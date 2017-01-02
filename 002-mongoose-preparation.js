// 1. 首先你必须安装MongoDB和NodeJS

// 2. 在项目只能够创建一个数据库连接

var mongoose = require('mongoose'); //引用mongoose模块
var db = mongoose.createConnection('localhost', 'abc'); //创建一个数据库连接, mongoose是数据库名

// 3.打开本机localhost的test数据库时，我们可以监测是否有异常

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
    //一次打开记录
    console.log("一次打开记录");
});

//成功开启数据库后，就可以执行数据库相应操作，假设以下代码都在回调中处理
//4.定义一个Schema
var PersonSchema = new mongoose.Schema({
    name: String //定义一个属性name，类型为String
});

// 5.将该Schema发布为Model
//var PersonModel = db.model('Person', PersonSchema);
//如果该Model已经发布，则可以直接通过名字索引到，如下：
//var PersonModel = db.model('Person');
//如果没有发布，上一段代码将会异常

//6.用Model创建Entity
//var personEntity = new PersonModel({ name: 'Krouky' });
//打印这个实体的名字看看
//console.log(personEntity.name); //Krouk

// 7.我们甚至可以为此Schema创建方法
//为Schema模型追加speak方法
PersonSchema.methods.speak = function() {
    console.log('我的名字叫' + this.name);
};
var PersonModel = db.model('Jsw', PersonSchema);
var personEntity = new PersonModel({ name: 'Krouky' });
personEntity.speak(); //我的名字叫Krouky

// 8.Entity是具有具体的数据库操作CRUD的
personEntity.save(); //执行完成后，数据库就有该数据了

// 9.如果要执行查询，需要依赖Model，当然Entity也是可以做到的
PersonModel.find(function(err, persons) {
	//查询到的所有person
	persons.forEach(function(item) {
		console.log(item.name);
	});    
});


/*注意：
1. 具体的如何配置Schema、Model以及Model和Entity的相关操作，我们会在后面进行
2. Model和Entity都有能影响数据库的操作，但仍有区别，后面我们也会做解释*/