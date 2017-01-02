
var mongoose = require('mongoose'); //引用mongoose模块
var assert = require('assert');
var db = mongoose.createConnection("localhost", "abc");

var PersonSchema = new Schema({
    name: {
        type: 'String',
        required: true //姓名非空
    },
    age: {
        type: 'Nunmer',
        min: 18, //年龄最小18
        max: 120 //年龄最大120
    },
    city: {
        type: 'String',
        enum: ['北京', '上海'] //只能是北京、上海人
    },
    other: {
        type: 'String',
        validate: [validator, err] //validator是一个验证函数，err是验证失败的错误信息
    }
});

