import React from "react";
import Hero from "../../components/hero/hero";
import ShetrHero from "../../components/hero/shetrHero";

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
