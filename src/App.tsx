import React from 'react';
import { Provider } from 'react-redux';
import {store} from "./store/store";
import {Cart} from "./pages/cart";
import '@vkontakte/vkui/dist/vkui.css';
import {
    AppRoot,
    PanelHeader,
    SplitLayout,
    usePlatform,
} from "@vkontakte/vkui";

function App() {
    const platform = usePlatform();
  return (
      <Provider store={store}>
          <AppRoot>
              <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none"/>}>
                  <Cart />
              </SplitLayout>
          </AppRoot>
      </Provider>
  );
}

export default App;
