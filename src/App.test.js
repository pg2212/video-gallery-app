import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './redux-store/Store'


test('navBrand', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headingElement = screen.getAllByText(/video/i);
  expect(headingElement).not.toHaveLength(0);
});