import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AdaptivityProvider, ConfigProvider} from "@vkontakte/vkui";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ConfigProvider appearance="dark">
          <AdaptivityProvider>
            <App />
          </AdaptivityProvider>
      </ConfigProvider>
  </React.StrictMode>
);