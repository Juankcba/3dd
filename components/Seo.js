import React from "react";
import Head from "next/head";
export default function Seo(props) {
  const { title, description } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="description" content={description} />

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"
          rel="stylesheet"
        />

        <link rel="shortcut icon" type="image/png" href="img/favicon.png" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

Seo.defaultProps = {
  title: "Blade Link 3D Printers &mdash;",
  description: "Los mejores diseños 3D",
};
