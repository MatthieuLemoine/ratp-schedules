import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en-US">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#ed4c5c" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="RATP schedules" />
          <meta name="application-name" content="RATP schedules" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="msapplication-TileImage" content="/static/mstile-144x144.png" />
          <meta name="msapplication-config" content="/static/browserconfig.xml" />
          <meta name="theme-color" content="#ed4c5c" />
          <meta name="Description" content="Live & fast access to Paris transport schedules" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
