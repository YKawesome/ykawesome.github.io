import React from "react";
import Hero from "../../components/Hero/Hero";
import ShetrHero from "../../components/Hero/ShetrHero";

function Home({shetr = false, toggleShetr}) {
  return (
    <>
      {
        shetr ? <ShetrHero toggleShetr={toggleShetr}/> : <Hero toggleShetr={toggleShetr}/>
      }
    </>
  );
}

export default Home;
