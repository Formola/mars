import React from "react";
import { Link } from "react-router-dom";
import "../css/matchcard.css"

export const MatchCard = ({ match, key }) => {
  return match ? (
    <Link key={key} to="/match" state={match}>
    <div
      className="is-clickable content matchcards has-background-primary box is-flex  is-justify-content-space-between has-text-white m-3 is-flex-direction-column-mobile"
    >
      <div className="is-flex is-flex-direction-column">
        <span className="is-size-3 is-size-4-mobile">{match.winner.username}</span>
        <span className="is-size-6">
          {"As " + match.winner.points.corporation}
        </span>
      </div>
      <span className="has-text-centered is-size-1">{match.winner.points.finalPoints}</span>
    </div>
    </Link>
    
  ) : null;
};
