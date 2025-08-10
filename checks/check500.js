const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 500;
  res.end('Server Error');
});

server.listen(0, () => {
  const { port } = server.address();
  http.get({ hostname: '127.0.0.1', port, path: '/' }, res => {
    server.close();
    if (res.statusCode === 500) {
      console.log('500 check passed');
    } else {
      console.error(`500 check failed: expected 500 got ${res.statusCode}`);
      process.exit(1);
    }
  }).on('error', err => {
    server.close();
    console.error('500 check failed:', err.message);
    process.exit(1);
  });
});
