PersonModel.findById(id, function(err, person) {
    person.name = 'MDragon';
    person.save(function(err) {});
});

// 利用Model模型查询到了person对象，该对象属于Entity，可以有save操作，如果使用Model`操作