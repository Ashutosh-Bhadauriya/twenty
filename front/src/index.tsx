import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { ThemeType } from '@/ui/themes/themes';

import '@emotion/react';

import { ApolloProvider } from './providers/apollo/ApolloProvider';
import { ClientConfigProvider } from './providers/clientConfig/ClientConfigProvider';
import { AppThemeProvider } from './providers/theme/AppThemeProvider';
import { UserProvider } from './providers/user/UserProvider';
import { App } from './App';

import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <RecoilRoot>
    <ApolloProvider>
      <BrowserRouter>
        <AppThemeProvider>
          <StrictMode>
            <UserProvider>
              <ClientConfigProvider>
                <App />
              </ClientConfigProvider>
            </UserProvider>
          </StrictMode>
        </AppThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </RecoilRoot>,
);

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeType {}
}
