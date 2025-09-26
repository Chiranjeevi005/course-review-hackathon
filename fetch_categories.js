const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3003,
  path: '/api/categories',
  method: 'GET'
};

const req = http.request(options, res => {
  let data = '';
  
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log(JSON.stringify(jsonData.data, null, 2));
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
});

req.on('error', error => {
  console.error('Error fetching categories:', error);
});

req.end();