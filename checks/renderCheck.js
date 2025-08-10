const React = require('react');
const { renderToString } = require('react-dom/server');

try {
  renderToString(React.createElement('div', null, 'Render Test'));
  console.log('Render check passed');
} catch (err) {
  console.error('Render check failed');
  process.exit(1);
}
