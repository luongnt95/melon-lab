import isDev from 'electron-is-dev';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();
const sprites = require('svg-sprite-loader/runtime/sprite.build').stringify();

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    return { html, head, errorHtml, chunks, styles: flush() };
  }

  public render() {
    const csp = isDev ?
      `default-src 'self' 'unsafe-inline'; connect-src http://localhost:3000 ${config.jsonRpcEndpoint}; font-src data: http://localhost:3000;` :
      `default-src 'self' 'unsafe-inline'; connect-src ${config.jsonRpcEndpoint}; font-src data: file:;`;

    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />
          <meta httpEquiv="Content-Security-Policy" content={csp} />
          <link rel="manifest" href="./static/manifest.json" />
          <link rel="shortcut icon" href="./static/favicon.png?v=2" />
          <title>Melon Olympiad</title>
        </Head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: sprites }} />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
