const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 404;
  res.end('Not Found');
});

server.listen(0, () => {
  const { port } = server.address();
  http.get({ hostname: '127.0.0.1', port, path: '/missing' }, res => {
    server.close();
    if (res.statusCode === 404) {
      console.log('404 check passed');
    } else {
      console.error(`404 check failed: expected 404 got ${res.statusCode}`);
      process.exit(1);
    }
  }).on('error', err => {
    server.close();
    console.error('404 check failed:', err.message);
    process.exit(1);
  });
});
