const { registerFont } = require('canvas');
const path = require('path');
const { FontFamily } = require('./src');

beforeAll(() => {
  registerFont(path.resolve(__dirname, 'public', 'Gaegu-Regular.ttf'), {
    family: FontFamily.ROUGH,
    weight: 'normal',
    style: 'normal',
  });
});
