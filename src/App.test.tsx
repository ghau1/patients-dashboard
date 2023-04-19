/**
 * @jest-environment jsdom
 */

import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
