import { render } from '../src';
import './utils/matcher';

const violinData = [
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3.5,
  },
  {
    category: 'SepalLength',
    value: 5.1,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 4.9,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.3,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 4.7,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 4.6,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3.6,
  },
  {
    category: 'SepalLength',
    value: 5,
  },
  {
    category: 'PetalWidth',
    value: 0.4,
  },
  {
    category: 'PetalLength',
    value: 1.7,
  },
  {
    category: 'SepalWidth',
    value: 3.9,
  },
  {
    category: 'SepalLength',
    value: 5.4,
  },
  {
    category: 'PetalWidth',
    value: 0.3,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 4.6,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 5,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 2.9,
  },
  {
    category: 'SepalLength',
    value: 4.4,
  },
  {
    category: 'PetalWidth',
    value: 0.1,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 4.9,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.7,
  },
  {
    category: 'SepalLength',
    value: 5.4,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.6,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 4.8,
  },
  {
    category: 'PetalWidth',
    value: 0.1,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 4.8,
  },
  {
    category: 'PetalWidth',
    value: 0.1,
  },
  {
    category: 'PetalLength',
    value: 1.1,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 4.3,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.2,
  },
  {
    category: 'SepalWidth',
    value: 4,
  },
  {
    category: 'SepalLength',
    value: 5.8,
  },
  {
    category: 'PetalWidth',
    value: 0.4,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 4.4,
  },
  {
    category: 'SepalLength',
    value: 5.7,
  },
  {
    category: 'PetalWidth',
    value: 0.4,
  },
  {
    category: 'PetalLength',
    value: 1.3,
  },
  {
    category: 'SepalWidth',
    value: 3.9,
  },
  {
    category: 'SepalLength',
    value: 5.4,
  },
  {
    category: 'PetalWidth',
    value: 0.3,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3.5,
  },
  {
    category: 'SepalLength',
    value: 5.1,
  },
  {
    category: 'PetalWidth',
    value: 0.3,
  },
  {
    category: 'PetalLength',
    value: 1.7,
  },
  {
    category: 'SepalWidth',
    value: 3.8,
  },
  {
    category: 'SepalLength',
    value: 5.7,
  },
  {
    category: 'PetalWidth',
    value: 0.3,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.8,
  },
  {
    category: 'SepalLength',
    value: 5.1,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.7,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 5.4,
  },
  {
    category: 'PetalWidth',
    value: 0.4,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.7,
  },
  {
    category: 'SepalLength',
    value: 5.1,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1,
  },
  {
    category: 'SepalWidth',
    value: 3.6,
  },
  {
    category: 'SepalLength',
    value: 4.6,
  },
  {
    category: 'PetalWidth',
    value: 0.5,
  },
  {
    category: 'PetalLength',
    value: 1.7,
  },
  {
    category: 'SepalWidth',
    value: 3.3,
  },
  {
    category: 'SepalLength',
    value: 5.1,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.9,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 4.8,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.6,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 5,
  },
  {
    category: 'PetalWidth',
    value: 0.4,
  },
  {
    category: 'PetalLength',
    value: 1.6,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 5,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.5,
  },
  {
    category: 'SepalLength',
    value: 5.2,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 5.2,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.6,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 4.7,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.6,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 4.8,
  },
  {
    category: 'PetalWidth',
    value: 0.4,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 5.4,
  },
  {
    category: 'PetalWidth',
    value: 0.1,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 4.1,
  },
  {
    category: 'SepalLength',
    value: 5.2,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 4.2,
  },
  {
    category: 'SepalLength',
    value: 5.5,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 4.9,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.2,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 5,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.3,
  },
  {
    category: 'SepalWidth',
    value: 3.5,
  },
  {
    category: 'SepalLength',
    value: 5.5,
  },
  {
    category: 'PetalWidth',
    value: 0.1,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3.6,
  },
  {
    category: 'SepalLength',
    value: 4.9,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.3,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 4.4,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 5.1,
  },
  {
    category: 'PetalWidth',
    value: 0.3,
  },
  {
    category: 'PetalLength',
    value: 1.3,
  },
  {
    category: 'SepalWidth',
    value: 3.5,
  },
  {
    category: 'SepalLength',
    value: 5,
  },
  {
    category: 'PetalWidth',
    value: 0.3,
  },
  {
    category: 'PetalLength',
    value: 1.3,
  },
  {
    category: 'SepalWidth',
    value: 2.3,
  },
  {
    category: 'SepalLength',
    value: 4.5,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.3,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 4.4,
  },
  {
    category: 'PetalWidth',
    value: 0.6,
  },
  {
    category: 'PetalLength',
    value: 1.6,
  },
  {
    category: 'SepalWidth',
    value: 3.5,
  },
  {
    category: 'SepalLength',
    value: 5,
  },
  {
    category: 'PetalWidth',
    value: 0.4,
  },
  {
    category: 'PetalLength',
    value: 1.9,
  },
  {
    category: 'SepalWidth',
    value: 3.8,
  },
  {
    category: 'SepalLength',
    value: 5.1,
  },
  {
    category: 'PetalWidth',
    value: 0.3,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 4.8,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.6,
  },
  {
    category: 'SepalWidth',
    value: 3.8,
  },
  {
    category: 'SepalLength',
    value: 5.1,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 4.6,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.5,
  },
  {
    category: 'SepalWidth',
    value: 3.7,
  },
  {
    category: 'SepalLength',
    value: 5.3,
  },
  {
    category: 'PetalWidth',
    value: 0.2,
  },
  {
    category: 'PetalLength',
    value: 1.4,
  },
  {
    category: 'SepalWidth',
    value: 3.3,
  },
  {
    category: 'SepalLength',
    value: 5,
  },
  {
    category: 'PetalWidth',
    value: 1.4,
  },
  {
    category: 'PetalLength',
    value: 4.7,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 7,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 4.5,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 6.4,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 4.9,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 6.9,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4,
  },
  {
    category: 'SepalWidth',
    value: 2.3,
  },
  {
    category: 'SepalLength',
    value: 5.5,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 4.6,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 6.5,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4.5,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 5.7,
  },
  {
    category: 'PetalWidth',
    value: 1.6,
  },
  {
    category: 'PetalLength',
    value: 4.7,
  },
  {
    category: 'SepalWidth',
    value: 3.3,
  },
  {
    category: 'SepalLength',
    value: 6.3,
  },
  {
    category: 'PetalWidth',
    value: 1,
  },
  {
    category: 'PetalLength',
    value: 3.3,
  },
  {
    category: 'SepalWidth',
    value: 2.4,
  },
  {
    category: 'SepalLength',
    value: 4.9,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4.6,
  },
  {
    category: 'SepalWidth',
    value: 2.9,
  },
  {
    category: 'SepalLength',
    value: 6.6,
  },
  {
    category: 'PetalWidth',
    value: 1.4,
  },
  {
    category: 'PetalLength',
    value: 3.9,
  },
  {
    category: 'SepalWidth',
    value: 2.7,
  },
  {
    category: 'SepalLength',
    value: 5.2,
  },
  {
    category: 'PetalWidth',
    value: 1,
  },
  {
    category: 'PetalLength',
    value: 3.5,
  },
  {
    category: 'SepalWidth',
    value: 2,
  },
  {
    category: 'SepalLength',
    value: 5,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 4.2,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 5.9,
  },
  {
    category: 'PetalWidth',
    value: 1,
  },
  {
    category: 'PetalLength',
    value: 4,
  },
  {
    category: 'SepalWidth',
    value: 2.2,
  },
  {
    category: 'SepalLength',
    value: 6,
  },
  {
    category: 'PetalWidth',
    value: 1.4,
  },
  {
    category: 'PetalLength',
    value: 4.7,
  },
  {
    category: 'SepalWidth',
    value: 2.9,
  },
  {
    category: 'SepalLength',
    value: 6.1,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 3.6,
  },
  {
    category: 'SepalWidth',
    value: 2.9,
  },
  {
    category: 'SepalLength',
    value: 5.6,
  },
  {
    category: 'PetalWidth',
    value: 1.4,
  },
  {
    category: 'PetalLength',
    value: 4.4,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 6.7,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 4.5,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 5.6,
  },
  {
    category: 'PetalWidth',
    value: 1,
  },
  {
    category: 'PetalLength',
    value: 4.1,
  },
  {
    category: 'SepalWidth',
    value: 2.7,
  },
  {
    category: 'SepalLength',
    value: 5.8,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 4.5,
  },
  {
    category: 'SepalWidth',
    value: 2.2,
  },
  {
    category: 'SepalLength',
    value: 6.2,
  },
  {
    category: 'PetalWidth',
    value: 1.1,
  },
  {
    category: 'PetalLength',
    value: 3.9,
  },
  {
    category: 'SepalWidth',
    value: 2.5,
  },
  {
    category: 'SepalLength',
    value: 5.6,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 4.8,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 5.9,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 6.1,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 4.9,
  },
  {
    category: 'SepalWidth',
    value: 2.5,
  },
  {
    category: 'SepalLength',
    value: 6.3,
  },
  {
    category: 'PetalWidth',
    value: 1.2,
  },
  {
    category: 'PetalLength',
    value: 4.7,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 6.1,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4.3,
  },
  {
    category: 'SepalWidth',
    value: 2.9,
  },
  {
    category: 'SepalLength',
    value: 6.4,
  },
  {
    category: 'PetalWidth',
    value: 1.4,
  },
  {
    category: 'PetalLength',
    value: 4.4,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 6.6,
  },
  {
    category: 'PetalWidth',
    value: 1.4,
  },
  {
    category: 'PetalLength',
    value: 4.8,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 6.8,
  },
  {
    category: 'PetalWidth',
    value: 1.7,
  },
  {
    category: 'PetalLength',
    value: 5,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 6.7,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 4.5,
  },
  {
    category: 'SepalWidth',
    value: 2.9,
  },
  {
    category: 'SepalLength',
    value: 6,
  },
  {
    category: 'PetalWidth',
    value: 1,
  },
  {
    category: 'PetalLength',
    value: 3.5,
  },
  {
    category: 'SepalWidth',
    value: 2.6,
  },
  {
    category: 'SepalLength',
    value: 5.7,
  },
  {
    category: 'PetalWidth',
    value: 1.1,
  },
  {
    category: 'PetalLength',
    value: 3.8,
  },
  {
    category: 'SepalWidth',
    value: 2.4,
  },
  {
    category: 'SepalLength',
    value: 5.5,
  },
  {
    category: 'PetalWidth',
    value: 1,
  },
  {
    category: 'PetalLength',
    value: 3.7,
  },
  {
    category: 'SepalWidth',
    value: 2.4,
  },
  {
    category: 'SepalLength',
    value: 5.5,
  },
  {
    category: 'PetalWidth',
    value: 1.2,
  },
  {
    category: 'PetalLength',
    value: 3.9,
  },
  {
    category: 'SepalWidth',
    value: 2.7,
  },
  {
    category: 'SepalLength',
    value: 5.8,
  },
  {
    category: 'PetalWidth',
    value: 1.6,
  },
  {
    category: 'PetalLength',
    value: 5.1,
  },
  {
    category: 'SepalWidth',
    value: 2.7,
  },
  {
    category: 'SepalLength',
    value: 6,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 4.5,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 5.4,
  },
  {
    category: 'PetalWidth',
    value: 1.6,
  },
  {
    category: 'PetalLength',
    value: 4.5,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 6,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 4.7,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 6.7,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4.4,
  },
  {
    category: 'SepalWidth',
    value: 2.3,
  },
  {
    category: 'SepalLength',
    value: 6.3,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4.1,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 5.6,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4,
  },
  {
    category: 'SepalWidth',
    value: 2.5,
  },
  {
    category: 'SepalLength',
    value: 5.5,
  },
  {
    category: 'PetalWidth',
    value: 1.2,
  },
  {
    category: 'PetalLength',
    value: 4.4,
  },
  {
    category: 'SepalWidth',
    value: 2.6,
  },
  {
    category: 'SepalLength',
    value: 5.5,
  },
  {
    category: 'PetalWidth',
    value: 1.4,
  },
  {
    category: 'PetalLength',
    value: 4.6,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 6.1,
  },
  {
    category: 'PetalWidth',
    value: 1.2,
  },
  {
    category: 'PetalLength',
    value: 4,
  },
  {
    category: 'SepalWidth',
    value: 2.6,
  },
  {
    category: 'SepalLength',
    value: 5.8,
  },
  {
    category: 'PetalWidth',
    value: 1,
  },
  {
    category: 'PetalLength',
    value: 3.3,
  },
  {
    category: 'SepalWidth',
    value: 2.3,
  },
  {
    category: 'SepalLength',
    value: 5,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4.2,
  },
  {
    category: 'SepalWidth',
    value: 2.7,
  },
  {
    category: 'SepalLength',
    value: 5.6,
  },
  {
    category: 'PetalWidth',
    value: 1.2,
  },
  {
    category: 'PetalLength',
    value: 4.2,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 5.7,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4.2,
  },
  {
    category: 'SepalWidth',
    value: 2.9,
  },
  {
    category: 'SepalLength',
    value: 5.7,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4.3,
  },
  {
    category: 'SepalWidth',
    value: 2.9,
  },
  {
    category: 'SepalLength',
    value: 6.2,
  },
  {
    category: 'PetalWidth',
    value: 1.1,
  },
  {
    category: 'PetalLength',
    value: 3,
  },
  {
    category: 'SepalWidth',
    value: 2.5,
  },
  {
    category: 'SepalLength',
    value: 5.1,
  },
  {
    category: 'PetalWidth',
    value: 1.3,
  },
  {
    category: 'PetalLength',
    value: 4.1,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 5.7,
  },
  {
    category: 'PetalWidth',
    value: 2.5,
  },
  {
    category: 'PetalLength',
    value: 6,
  },
  {
    category: 'SepalWidth',
    value: 3.3,
  },
  {
    category: 'SepalLength',
    value: 6.3,
  },
  {
    category: 'PetalWidth',
    value: 1.9,
  },
  {
    category: 'PetalLength',
    value: 5.1,
  },
  {
    category: 'SepalWidth',
    value: 2.7,
  },
  {
    category: 'SepalLength',
    value: 5.8,
  },
  {
    category: 'PetalWidth',
    value: 2.1,
  },
  {
    category: 'PetalLength',
    value: 5.9,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 7.1,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 5.6,
  },
  {
    category: 'SepalWidth',
    value: 2.9,
  },
  {
    category: 'SepalLength',
    value: 6.3,
  },
  {
    category: 'PetalWidth',
    value: 2.2,
  },
  {
    category: 'PetalLength',
    value: 5.8,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 6.5,
  },
  {
    category: 'PetalWidth',
    value: 2.1,
  },
  {
    category: 'PetalLength',
    value: 6.6,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 7.6,
  },
  {
    category: 'PetalWidth',
    value: 1.7,
  },
  {
    category: 'PetalLength',
    value: 4.5,
  },
  {
    category: 'SepalWidth',
    value: 2.5,
  },
  {
    category: 'SepalLength',
    value: 4.9,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 6.3,
  },
  {
    category: 'SepalWidth',
    value: 2.9,
  },
  {
    category: 'SepalLength',
    value: 7.3,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 5.8,
  },
  {
    category: 'SepalWidth',
    value: 2.5,
  },
  {
    category: 'SepalLength',
    value: 6.7,
  },
  {
    category: 'PetalWidth',
    value: 2.5,
  },
  {
    category: 'PetalLength',
    value: 6.1,
  },
  {
    category: 'SepalWidth',
    value: 3.6,
  },
  {
    category: 'SepalLength',
    value: 7.2,
  },
  {
    category: 'PetalWidth',
    value: 2,
  },
  {
    category: 'PetalLength',
    value: 5.1,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 6.5,
  },
  {
    category: 'PetalWidth',
    value: 1.9,
  },
  {
    category: 'PetalLength',
    value: 5.3,
  },
  {
    category: 'SepalWidth',
    value: 2.7,
  },
  {
    category: 'SepalLength',
    value: 6.4,
  },
  {
    category: 'PetalWidth',
    value: 2.1,
  },
  {
    category: 'PetalLength',
    value: 5.5,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 6.8,
  },
  {
    category: 'PetalWidth',
    value: 2,
  },
  {
    category: 'PetalLength',
    value: 5,
  },
  {
    category: 'SepalWidth',
    value: 2.5,
  },
  {
    category: 'SepalLength',
    value: 5.7,
  },
  {
    category: 'PetalWidth',
    value: 2.4,
  },
  {
    category: 'PetalLength',
    value: 5.1,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 5.8,
  },
  {
    category: 'PetalWidth',
    value: 2.3,
  },
  {
    category: 'PetalLength',
    value: 5.3,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 6.4,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 5.5,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 6.5,
  },
  {
    category: 'PetalWidth',
    value: 2.2,
  },
  {
    category: 'PetalLength',
    value: 6.7,
  },
  {
    category: 'SepalWidth',
    value: 3.8,
  },
  {
    category: 'SepalLength',
    value: 7.7,
  },
  {
    category: 'PetalWidth',
    value: 2.3,
  },
  {
    category: 'PetalLength',
    value: 6.9,
  },
  {
    category: 'SepalWidth',
    value: 2.6,
  },
  {
    category: 'SepalLength',
    value: 7.7,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 5,
  },
  {
    category: 'SepalWidth',
    value: 2.2,
  },
  {
    category: 'SepalLength',
    value: 6,
  },
  {
    category: 'PetalWidth',
    value: 2.3,
  },
  {
    category: 'PetalLength',
    value: 5.7,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 6.9,
  },
  {
    category: 'PetalWidth',
    value: 2,
  },
  {
    category: 'PetalLength',
    value: 4.9,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 5.6,
  },
  {
    category: 'PetalWidth',
    value: 2,
  },
  {
    category: 'PetalLength',
    value: 6.7,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 7.7,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 4.9,
  },
  {
    category: 'SepalWidth',
    value: 2.7,
  },
  {
    category: 'SepalLength',
    value: 6.3,
  },
  {
    category: 'PetalWidth',
    value: 2.1,
  },
  {
    category: 'PetalLength',
    value: 5.7,
  },
  {
    category: 'SepalWidth',
    value: 3.3,
  },
  {
    category: 'SepalLength',
    value: 6.7,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 6,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 7.2,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 4.8,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 6.2,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 4.9,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 6.1,
  },
  {
    category: 'PetalWidth',
    value: 2.1,
  },
  {
    category: 'PetalLength',
    value: 5.6,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 6.4,
  },
  {
    category: 'PetalWidth',
    value: 1.6,
  },
  {
    category: 'PetalLength',
    value: 5.8,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 7.2,
  },
  {
    category: 'PetalWidth',
    value: 1.9,
  },
  {
    category: 'PetalLength',
    value: 6.1,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 7.4,
  },
  {
    category: 'PetalWidth',
    value: 2,
  },
  {
    category: 'PetalLength',
    value: 6.4,
  },
  {
    category: 'SepalWidth',
    value: 3.8,
  },
  {
    category: 'SepalLength',
    value: 7.9,
  },
  {
    category: 'PetalWidth',
    value: 2.2,
  },
  {
    category: 'PetalLength',
    value: 5.6,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 6.4,
  },
  {
    category: 'PetalWidth',
    value: 1.5,
  },
  {
    category: 'PetalLength',
    value: 5.1,
  },
  {
    category: 'SepalWidth',
    value: 2.8,
  },
  {
    category: 'SepalLength',
    value: 6.3,
  },
  {
    category: 'PetalWidth',
    value: 1.4,
  },
  {
    category: 'PetalLength',
    value: 5.6,
  },
  {
    category: 'SepalWidth',
    value: 2.6,
  },
  {
    category: 'SepalLength',
    value: 6.1,
  },
  {
    category: 'PetalWidth',
    value: 2.3,
  },
  {
    category: 'PetalLength',
    value: 6.1,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 7.7,
  },
  {
    category: 'PetalWidth',
    value: 2.4,
  },
  {
    category: 'PetalLength',
    value: 5.6,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 6.3,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 5.5,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 6.4,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 4.8,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 6,
  },
  {
    category: 'PetalWidth',
    value: 2.1,
  },
  {
    category: 'PetalLength',
    value: 5.4,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 6.9,
  },
  {
    category: 'PetalWidth',
    value: 2.4,
  },
  {
    category: 'PetalLength',
    value: 5.6,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 6.7,
  },
  {
    category: 'PetalWidth',
    value: 2.3,
  },
  {
    category: 'PetalLength',
    value: 5.1,
  },
  {
    category: 'SepalWidth',
    value: 3.1,
  },
  {
    category: 'SepalLength',
    value: 6.9,
  },
  {
    category: 'PetalWidth',
    value: 1.9,
  },
  {
    category: 'PetalLength',
    value: 5.1,
  },
  {
    category: 'SepalWidth',
    value: 2.7,
  },
  {
    category: 'SepalLength',
    value: 5.8,
  },
  {
    category: 'PetalWidth',
    value: 2.3,
  },
  {
    category: 'PetalLength',
    value: 5.9,
  },
  {
    category: 'SepalWidth',
    value: 3.2,
  },
  {
    category: 'SepalLength',
    value: 6.8,
  },
  {
    category: 'PetalWidth',
    value: 2.5,
  },
  {
    category: 'PetalLength',
    value: 5.7,
  },
  {
    category: 'SepalWidth',
    value: 3.3,
  },
  {
    category: 'SepalLength',
    value: 6.7,
  },
  {
    category: 'PetalWidth',
    value: 2.3,
  },
  {
    category: 'PetalLength',
    value: 5.2,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 6.7,
  },
  {
    category: 'PetalWidth',
    value: 1.9,
  },
  {
    category: 'PetalLength',
    value: 5,
  },
  {
    category: 'SepalWidth',
    value: 2.5,
  },
  {
    category: 'SepalLength',
    value: 6.3,
  },
  {
    category: 'PetalWidth',
    value: 2,
  },
  {
    category: 'PetalLength',
    value: 5.2,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 6.5,
  },
  {
    category: 'PetalWidth',
    value: 2.3,
  },
  {
    category: 'PetalLength',
    value: 5.4,
  },
  {
    category: 'SepalWidth',
    value: 3.4,
  },
  {
    category: 'SepalLength',
    value: 6.2,
  },
  {
    category: 'PetalWidth',
    value: 1.8,
  },
  {
    category: 'PetalLength',
    value: 5.1,
  },
  {
    category: 'SepalWidth',
    value: 3,
  },
  {
    category: 'SepalLength',
    value: 5.9,
  },
];

describe('SSR render', () => {
  it('violin', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'violin',
      data: violinData,
      axisXTitle: 'category',
      axisYTitle: 'value',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'violin');
  });

  it('violin-required', async () => {
    const vis = await render({
      type: 'violin',
      data: violinData,
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'violin-required');
  });

  it('violin-grouped', async () => {
    const vis = await render({
      width: 600,
      height: 400,
      type: 'violin',
      group: true,
      data: [
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.5 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.1 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.9 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.3 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.2 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.7 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.1 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.6 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.6 },
        { group: 'I. setosa', category: 'SepalLength', value: 5 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.4 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.7 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.9 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.4 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.3 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.4 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.6 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.4 },
        { group: 'I. setosa', category: 'SepalLength', value: 5 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 2.9 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.4 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.1 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.1 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.9 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.7 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.4 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.6 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.4 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.8 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.1 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.8 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.1 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.1 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.3 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.2 },
        { group: 'I. setosa', category: 'SepalWidth', value: 4 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.8 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.4 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 4.4 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.7 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.4 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.3 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.9 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.4 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.3 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.5 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.1 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.3 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.7 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.8 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.7 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.3 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.8 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.1 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.7 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.4 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.4 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.4 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.7 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.1 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.6 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.6 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.5 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.7 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.3 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.1 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.9 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.4 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.8 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.6 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3 },
        { group: 'I. setosa', category: 'SepalLength', value: 5 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.4 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.6 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.4 },
        { group: 'I. setosa', category: 'SepalLength', value: 5 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.5 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.2 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.4 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.2 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.6 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.2 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.7 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.6 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.1 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.8 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.4 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.4 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.4 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.1 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 4.1 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.2 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 4.2 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.5 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.1 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.9 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.2 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.2 },
        { group: 'I. setosa', category: 'SepalLength', value: 5 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.3 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.5 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.5 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.1 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.6 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.9 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.3 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.4 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.4 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.1 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.3 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.3 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.5 },
        { group: 'I. setosa', category: 'SepalLength', value: 5 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.3 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.3 },
        { group: 'I. setosa', category: 'SepalWidth', value: 2.3 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.5 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.3 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.2 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.4 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.6 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.6 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.5 },
        { group: 'I. setosa', category: 'SepalLength', value: 5 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.4 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.9 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.8 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.1 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.3 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.8 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.6 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.8 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.1 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.2 },
        { group: 'I. setosa', category: 'SepalLength', value: 4.6 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.5 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.7 },
        { group: 'I. setosa', category: 'SepalLength', value: 5.3 },
        { group: 'I. setosa', category: 'PetalWidth', value: 0.2 },
        { group: 'I. setosa', category: 'PetalLength', value: 1.4 },
        { group: 'I. setosa', category: 'SepalWidth', value: 3.3 },
        { group: 'I. setosa', category: 'SepalLength', value: 5 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.4 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.7 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3.2 },
        { group: 'I. versicolor', category: 'SepalLength', value: 7 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.5 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3.2 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.4 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.9 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3.1 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.9 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.5 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.6 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.8 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.5 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.5 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.8 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.7 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.6 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.7 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3.3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.3 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3.3 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.4 },
        { group: 'I. versicolor', category: 'SepalLength', value: 4.9 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.6 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.9 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.4 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3.9 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.7 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.2 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3.5 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.2 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.9 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.2 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.4 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.7 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.9 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.1 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3.6 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.9 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.4 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.4 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3.1 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.7 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.5 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.1 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.7 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.8 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.5 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.2 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.2 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.1 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3.9 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.5 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.8 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.8 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3.2 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.9 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.8 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.1 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.9 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.5 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.3 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.2 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.7 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.8 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.1 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.3 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.9 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.4 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.4 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.4 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.4 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.8 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.8 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.8 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.7 },
        { group: 'I. versicolor', category: 'PetalLength', value: 5 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.7 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.5 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.9 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3.5 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.6 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.7 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.1 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3.8 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.4 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.5 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3.7 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.4 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.5 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.2 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3.9 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.7 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.8 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.6 },
        { group: 'I. versicolor', category: 'PetalLength', value: 5.1 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.7 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.5 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.4 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.6 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.5 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3.4 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.5 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.7 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3.1 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.7 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.4 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.3 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.1 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.5 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.5 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.2 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.4 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.6 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.5 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.4 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.6 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.1 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.2 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.6 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.8 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3.3 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.2 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.7 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.6 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.2 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.2 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 3 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.7 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.2 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.9 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.7 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.3 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.9 },
        { group: 'I. versicolor', category: 'SepalLength', value: 6.2 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.1 },
        { group: 'I. versicolor', category: 'PetalLength', value: 3 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.5 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.1 },
        { group: 'I. versicolor', category: 'PetalWidth', value: 1.3 },
        { group: 'I. versicolor', category: 'PetalLength', value: 4.1 },
        { group: 'I. versicolor', category: 'SepalWidth', value: 2.8 },
        { group: 'I. versicolor', category: 'SepalLength', value: 5.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.5 },
        { group: 'I. virginica', category: 'PetalLength', value: 6 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.3 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.3 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.9 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.1 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.7 },
        { group: 'I. virginica', category: 'SepalLength', value: 5.8 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.1 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.9 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.1 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.6 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.9 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.3 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.2 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.8 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.5 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.1 },
        { group: 'I. virginica', category: 'PetalLength', value: 6.6 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.6 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.7 },
        { group: 'I. virginica', category: 'PetalLength', value: 4.5 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.5 },
        { group: 'I. virginica', category: 'SepalLength', value: 4.9 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 6.3 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.9 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.3 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.8 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.5 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.5 },
        { group: 'I. virginica', category: 'PetalLength', value: 6.1 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.6 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.2 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.1 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.2 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.5 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.9 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.3 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.7 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.4 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.1 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.5 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.8 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2 },
        { group: 'I. virginica', category: 'PetalLength', value: 5 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.5 },
        { group: 'I. virginica', category: 'SepalLength', value: 5.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.4 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.1 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.8 },
        { group: 'I. virginica', category: 'SepalLength', value: 5.8 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.3 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.3 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.2 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.4 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.5 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.5 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.2 },
        { group: 'I. virginica', category: 'PetalLength', value: 6.7 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.8 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.3 },
        { group: 'I. virginica', category: 'PetalLength', value: 6.9 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.6 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.5 },
        { group: 'I. virginica', category: 'PetalLength', value: 5 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.2 },
        { group: 'I. virginica', category: 'SepalLength', value: 6 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.3 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.7 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.2 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.9 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2 },
        { group: 'I. virginica', category: 'PetalLength', value: 4.9 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.8 },
        { group: 'I. virginica', category: 'SepalLength', value: 5.6 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2 },
        { group: 'I. virginica', category: 'PetalLength', value: 6.7 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.8 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 4.9 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.7 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.3 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.1 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.7 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.3 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 6 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.2 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.2 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 4.8 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.8 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.2 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 4.9 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.1 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.1 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.6 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.8 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.4 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.6 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.8 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.2 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.9 },
        { group: 'I. virginica', category: 'PetalLength', value: 6.1 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.8 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.4 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2 },
        { group: 'I. virginica', category: 'PetalLength', value: 6.4 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.8 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.9 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.2 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.6 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.8 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.4 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.5 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.1 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.8 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.3 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.4 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.6 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.6 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.1 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.3 },
        { group: 'I. virginica', category: 'PetalLength', value: 6.1 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 7.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.4 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.6 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.4 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.3 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.5 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.1 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.4 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 4.8 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 6 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.1 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.4 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.1 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.9 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.4 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.6 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.1 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.3 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.1 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.1 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.9 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.9 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.1 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.7 },
        { group: 'I. virginica', category: 'SepalLength', value: 5.8 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.3 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.9 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.2 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.8 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.5 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.7 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.3 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.3 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.2 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.7 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.9 },
        { group: 'I. virginica', category: 'PetalLength', value: 5 },
        { group: 'I. virginica', category: 'SepalWidth', value: 2.5 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.3 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.2 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.5 },
        { group: 'I. virginica', category: 'PetalWidth', value: 2.3 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.4 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3.4 },
        { group: 'I. virginica', category: 'SepalLength', value: 6.2 },
        { group: 'I. virginica', category: 'PetalWidth', value: 1.8 },
        { group: 'I. virginica', category: 'PetalLength', value: 5.1 },
        { group: 'I. virginica', category: 'SepalWidth', value: 3 },
        { group: 'I. virginica', category: 'SepalLength', value: 5.9 },
      ],
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'violin-grouped');
  });

  it('violin-academy', async () => {
    const vis = await render({
      theme: 'academy',
      width: 600,
      height: 400,
      type: 'violin',
      data: violinData,
      axisXTitle: 'category',
      axisYTitle: 'value',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'violin-academy');
  });

  it('violin-rough', async () => {
    const vis = await render({
      theme: 'academy',
      width: 600,
      height: 400,
      type: 'violin',
      data: violinData,
      axisXTitle: 'category',
      axisYTitle: 'value',
      texture: 'rough',
    });

    expect(vis.toBuffer()).toImageEqual('__tests__/snapshot', 'violin-rough');
  });
});
