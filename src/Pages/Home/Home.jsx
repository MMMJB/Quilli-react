import React from "react";

import PrivateRoute from "../../Components/PrivateRoute";

import Loader from "../../Components/Loader";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Services from "./Components/Services";
import GetStarted from "./Components/GetStarted";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <PrivateRoute reverse={true}>
      <Loader>
        <div
          id="HOME"
          className="flex min-h-screen w-full flex-col items-center bg-salmon"
        >
          <Navbar />
          <Hero />
          <About />
          <Services />
          <GetStarted />
          <Footer />
        </div>
      </Loader>
    </PrivateRoute>
  );
}
