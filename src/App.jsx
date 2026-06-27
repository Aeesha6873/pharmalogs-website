import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import ProblemSection from "./components/ProblemSection";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import CTASection from "./components/CTASection";
// import Product from "./components/Product";
// import Clients from "./components/Clients";
// import Pricing from "./components/Pricing";
// import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <TrustBar />
              <ProblemSection />
              <HowItWorks />
              <Features />
              <Testimonials />
              <Pricing />
              <CTASection />
              <Footer />
            </>
          }
        />

        <Route path="/product" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/clients" element={<Testimonials />} />

        {/* <Route path="/login" element={<Login />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
