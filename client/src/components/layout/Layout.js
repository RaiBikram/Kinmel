import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

export default function Layout({
  children,
  title = "Kinmel - shop now",
  keyword = "Kinmel , bazaar, kinmel Bazaar",
  author = "Bikram Rai",
  description = "Tapaiko kinmel Bazaar",
}) {
  return (
    <>
    <div style={{backgroundColor:"#cce0d2"}}>
    <Helmet>
        <meta charSet="utf-8" />
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />

      <main style={{ minHeight: "100vh" }}>
        <Toaster position="top-right" />

        {children}
      </main>

      <Footer />
    </div>
      
    </>
  );
}
