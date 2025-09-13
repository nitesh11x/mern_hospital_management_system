import React from "react";
import Hero from "../components/Hero";
import BioGraphy from "../components/BioGraphy";
import Departments from "../components/Departments";
import MessageForm from "../components/commonComponents/MessageForm";
import Reviews from "../components/reviewComponents/Reviews";

const Home = () => {
  return (
    <>
      <Hero />
      <BioGraphy />
      <Departments />
      <Reviews />
      <MessageForm />
    </>
  );
};

export default Home;
