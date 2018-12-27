
var querystring = require('querystring');
var request = require('request');

var forms =[{
  username: 'usr',
  password: 'pwd',
  email: 'someemail@gmail.com'
},
{
  username: 'usr',
  password: 'pwd',
  email: 'arashdevelopermind@gmail.com'
},{
  username: 'usr',
  password: 'pwd',
  email: 'anyemail@gmail.com'
}] ;

var contentLength;
var i=0;
   
const doSomethingAsync = (form) => {
  return new Promise((resolve) => {
     // setTimeout(() => resolve('I did something'), 3000)
      request({
        headers: {
          'Content-Length': contentLength,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://127.0.0.1:3000/signup',
        body: form,
        method: 'POST'
      }, function (err, res, body) {
        //it works!
        console.log(body);
        resolve('I did something');
      });
  })
}

const doSomething = async (form) => {
  while(i<10 && await doSomethingAsync(form)){
    console.log(i);
      i++;
     }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const start = async () => {
  await asyncForEach(forms, async (form) => {
    var formData = querystring.stringify(form);
     contentLength = formData.length;
    await  doSomethingAsync(formData); 
  });

}

console.log('start')
while(i<10 ){
  start();
    i++;
   }
