/** @format */

import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import { Helmet } from "react-helmet"
import { ToastContainer } from 'react-toastify';
// import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
      <ToastContainer />
        {children}
        </main>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title : "Ecommerce App - shopnow",
  description : "Mern stack project",
  keywords : "mern,react,node,mongodb",
  author : "Viswa"
}

export default Layout
