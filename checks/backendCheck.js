const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('OK');
});

server.listen(0, () => {
  const { port } = server.address();
  http.get({ hostname: '127.0.0.1', port, path: '/' }, res => {
    server.close();
    if (res.statusCode === 200) {
      console.log('Backend check passed');
    } else {
      console.error(`Backend check failed: expected 200 got ${res.statusCode}`);
      process.exit(1);
    }
  }).on('error', err => {
    server.close();
    console.error('Backend check failed:', err.message);
    process.exit(1);
  });
});
