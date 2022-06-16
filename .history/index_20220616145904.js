const http = require('http');
const fs  = require('fs');
const requests = require('requests');

const homeFile = fs.readFileSync('home.html', 'utf-8');

const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace('{%tempval%}', orgVal.main.temp);
  temperature = tempVal.replace('{%tempmin%}', orgVal.main.temp);
  temperature = tempVal.replace('{%tempmax%}', orgVal.main.temp);
  temperature = tempVal.replace('{%location%}', orgVal.main.temp);
  temperature = tempVal.replace('{%country%}', orgVal.main.temp);
}

const server = http.createServer((req, res) =>{
  if (req.url=='/'){
    requests(`http://api.openweathermap.org/data/2.5/weather?q=Nainital&units=metric&appid=75b8a9f6f4733c7bcd246b6a9d74c556`)
.on('data', function (chunk) {
  const parsedData = JSON.parse(chunk);
  const arrData = [parsedData];
  // console.log(arrData)
  const realTimeData = arrData.map((val) => {
    replaceVal(homeFile,val);
  })
})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);
 
  console.log('end');
});
  }
})
server.listen(8000,'127.0.0.1');