const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3003,
  path: '/api/courses?limit=1',
  method: 'GET'
};

const req = http.request(options, res => {
  let data = '';
  
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response Headers:', res.headers);
    console.log('Response Body:');
    try {
      const jsonData = JSON.parse(data);
      console.log(JSON.stringify(jsonData, null, 2));
    } catch (error) {
      console.log('Raw data:', data);
    }
  });
});

req.on('error', error => {
  console.error('Error:', error);
});

req.end();