var faker=require('faker');

for (var i=0;i<10;i++){
    console.log(i+". "+faker.fake("{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.productName}}: {{commerce.price}}"))
}
 //list.forEach(function(val, ind){
 //    console.log(String(ind)+". "+val.product+": "+val.price)
 //})