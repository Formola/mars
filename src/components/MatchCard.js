import React from "react";
import { Link } from "react-router-dom";

export const MatchCard = ({ match, key }) => {
  return match ? (
    <Link key={key} to="/match" state={match}>
    <div
      className="is-clickable content has-background-primary box is-flex is-justify-content-space-between has-text-white m-3"
    >
      <div className="is-flex is-flex-direction-column">
        <span className="is-size-3">{match.winner.username}</span>
        <span className="is-size-6">
          {"As " + match.winner.points.corporation}
        </span>
      </div>
      <p className="is-size-1">{match.winner.points.finalPoints}</p>
    </div>
    </Link>
    
  ) : null;
};
