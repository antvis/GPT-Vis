---
order: 1
group:
  order: 2
  title: Maps
toc: content
debug: true
---

### Code Example

```jsx
import React, { useEffect, useMemo } from 'react';
import { Map } from '@antv/gpt-vis';

export default () => {
  const mapConfig = {
    mapType: 'light',
    scale: 17,
    longitude: 120.130638,
    latitude: 30.219835,
    skew: 0,
    rotate: 0,
  };

  return <Map {...mapConfig} containerStyle={{ height: 500 }} />;
};
```
