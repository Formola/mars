import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MatchList } from "./MatchList";
import "bulma/css/bulma.min.css";
import { fetchMatches } from "../utils/queries";

export const Home = () => {

  const [matches, setMatches] = useState()

  useEffect(() => {
    fetchMatches().then((matches) => setMatches(matches.reverse()))
  }, [])

  const navigate = useNavigate()
  return (
    <section className="hero is-primary is-fullheight">
      <div>
        <button className="button is-primary has-text-white is-large">
          <Link to="/dashboard">Profile</Link>
        </button>
        <div className="p-6 container is-max-desktop">
          <h1 className="is-size-3 has-text-centered has-text-weight-bold">
            MONKEY MARS
          </h1>
          <div className="card">
            
            <div className="card-content">
              <MatchList matches={matches}/>
            </div>
            <div className="card-footer is-flex-direction-row">
                <div onClick={() => navigate("/addgame")}className="has-background-primary card-footer-item is-clickable">
                  <p className="is-size-5 has-text-centered has-text-white">
                    ADD A GAME
                  </p>
                </div>
                <div onClick={() => navigate("/calculator")}className="has-background-primary card-footer-item is-clickable">
                  <p className="is-size-5 has-text-centered has-text-white">
                    CALCULATOR
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
