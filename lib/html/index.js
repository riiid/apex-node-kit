import React from 'react';
import {Observable} from 'rxjs';
import {renderToString} from 'react-dom/server';

const createResponse = (strings, title, app) => {
  const [str0, str1, str2] = strings;
  return {
    'Content-Type': 'text/html',
    'result': str0 + title + str1 + app + str2
  };
};

export default () => {
  const title = 'apex-node-kit';
  const app = renderToString(
    <div>
      <h2>Welcome</h2>
      <p>apex-node-kit</p>
    </div>
  );
  const response = createResponse`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <div id="app">
        ${app}
      </div>
    </body>
    </html>
  `;
  return Observable.of(response);
};
