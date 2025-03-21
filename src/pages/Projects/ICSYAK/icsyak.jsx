import React from "react";
import TypeIt from "typeit-react";
import { images } from "../../../utils/preloadimages";

function ICSYAK() {
  const icsyakImage = images["icsyak.png"];
  return (
    <div>
      <div
        className="hero  min-h-screen"
        style={{
          backgroundImage: `url(${icsyakImage})`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <TypeIt className="text-6xl md:text-8xl text-neutral-content font-bold mb-20">
              ICSYAK.
            </TypeIt>
            <div className="mt-6"></div>
            <TypeIt
              className="mt-20 text-xl md:text-2xl"
              options={{ startDelay: 1500, speed: 23 }}
            >
              A{" "}
              <span className="font-bold bg-primary text-primary-content px-0.5">
                Discord Bot
              </span>{" "}
              that <span className="italic">automatically</span> pulls threads
              from{" "}
              <span className="font-bold bg-accent text-accent-content px-0.5">
                Ed Discussion
              </span>{" "}
              and{" "}
              <span className="font-bold bg-accent text-primary-content px-0.5">
                Piazza
              </span>{" "}
              into{" "}
              <span className="font-bold bg-secondary text-secondary-content px-0.5">
                Discord
              </span>
              , supporting <span className="italic">on-demand</span>{" "}
              <span className="font-bold">thread lookup</span> and{" "}
              <span className="font-bold">reply display</span> for{" "}
              <span className="font-bold">1000+</span> students.
            </TypeIt>
            <p className="py-3 text-lg md:text-xl">
              Developed for ICS 6B/6D Fall 2023. <br />
            </p>

            <div className="join hovergrow">
              <a href="https://github.com/YKawesome/ICSYAK" target="_blank">
                <button className="btn btn-secondary btn-lg my-6 join-item">
                  GitHub
                </button>
              </a>
              {/* <a href="https://ant-logic.thebenjicat.dev/" target="_blank">
                    <button className="btn btn-primary my-6 join-item">
                    Live Site
                    </button>
                </a>
                <a href="https://devpost.com/software/antlogic" target="_blank">
                    <button className="btn btn-accent my-6 join-item">
                    Devpost
                    </button>
                </a> */}
            </div>
          </div>
        </div>
      </div>

      <div className="hero min-h-fit bg-base-100">
		
        <div className="overflow-x-auto max-w-md">
			<h1 className="text-4xl md:text-6xl text-base-content text-center font-bold mt-10 mb-5">Courses Served</h1>
          <table className="table">
            {/* head */}
            <thead>
              <tr className="font-bold text-base-content bg-base-200 md:text-xl">
                <th></th>
                <th>Dept</th>
                <th>#</th>
                <th>Prof</th>
                <th>Quarters</th>
              </tr>
            </thead>
            <tbody>
              {/* ICS rows */}
              <tr>
                <th>1</th>
                <td>ICS</td>
                <td>6B</td>
                <td>Gassko</td>
                <td>F23, S24, F24</td>
              </tr>
              <tr>
                <th>2</th>
                <td>ICS</td>
                <td>6D</td>
                <td>Gassko</td>
                <td>W24, W25</td>
              </tr>
              <tr>
                <th>3</th>
                <td>ICS</td>
                <td>45C</td>
                <td>Klefstad</td>
                <td>S24</td>
              </tr>
              <tr>
                <th>4</th>
                <td>ICS</td>
                <td>46</td>
                <td>Shindler</td>
                <td>F24</td>
              </tr>
              <tr>
                <th>5</th>
                <td>ICS</td>
                <td>51</td>
                <td>Dutt</td>
                <td>W24</td>
              </tr>
              <tr>
                <th>5</th>
                <td>ICS</td>
                <td>53</td>
                <td>Wong-ma</td>
                <td>W25</td>
              </tr>
              {/* STATS row */}
              <tr>
                <th>6</th>
                <td>STATS</td>
                <td>67</td>
                <td>Dogucu</td>
                <td>F24</td>
              </tr>
              {/* INF rows */}
              <tr>
                <th>7</th>
                <td>INF</td>
                <td>43</td>
                <td>Ziv</td>
                <td>W24</td>
              </tr>
              <tr>
                <th>8</th>
                <td>INF</td>
                <td>133</td>
                <td>Jaganath</td>
                <td>F24</td>
              </tr>
              {/* CS row */}
              <tr>
                <th>9</th>
                <td>CS</td>
                <td>122A</td>
                <td>Wong-ma</td>
                <td>F24</td>
              </tr>
              <tr>
                <th>10</th>
                <td>CS</td>
                <td>171</td>
                <td>Kask</td>
                <td>W25</td>
              </tr>
              { /* Total */ }
              <tr className="font-bold bg-base-200">
                <th>Total</th>
                <td colSpan="4">10 courses, 5 quarters, 8 Profs, 1000+ students</td>
              </tr>
            </tbody>
          </table>
		  <div className="mb-10"></div>
        </div>
		
      </div>
    </div>
  );
}

export default ICSYAK;
