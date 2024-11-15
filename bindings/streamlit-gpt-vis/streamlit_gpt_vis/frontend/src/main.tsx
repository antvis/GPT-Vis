import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StreamlitProvider } from 'streamlit-component-lib-react-hooks';
import './index.css';
import MyComponent from './MyComponent';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StreamlitProvider>
      <MyComponent />
    </StreamlitProvider>
  </StrictMode>,
);
