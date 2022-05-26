import React from "react";
import { Link } from "react-router-dom";
import { MatchList } from "./MatchList";

const handleOnClick = () => {

}

export const Home = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="is-size-1 has-text-centered">MONKEY MARS</h1>
        <MatchList />
        <Link to="/addgame">
        <div className="box container is-max-desktop has-background-primary">
          <p className="is-size-3 has-text-centered has-text-white">ADD A GAME</p> 
        </div>
        </Link>
      </div>
    </>
  );
};
