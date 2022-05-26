import React from "react";
import { Link } from "react-router-dom";

export const MatchCard = ({ match, key }) => {
  const _handleOnClick = () => console.log(key);

  return match ? (
    <Link to="/ue">
      <div key={key} onClick={_handleOnClick} className="card m-3 p-3">
        <div className="is-flex is-justify-content-space-between">
          <div>
            <p className="is-size-3">{match["vincitore"]}</p>
            <p className="is-size-6">{"as Credicor"}</p>
          </div>
          <p className="is-size-1">76</p>
        </div>
      </div>
    </Link>
  ) : (
    "nada"
  );
};
