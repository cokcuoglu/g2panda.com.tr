
const http = require('http');

const data = JSON.stringify({
    type: 'bill'
});

const options = {
    hostname: 'localhost',
    port: 7173,
    path: '/api/public/menu/table/505c6c9c-8b82-44e7-88a9-c831f2d4fd05/service-request',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log(`Sending POST request to http://${options.hostname}:${options.port}${options.path}`);

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(data);
req.end();
