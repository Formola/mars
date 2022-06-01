import React from "react";
import { MatchCard } from "./MatchCard";

export const MatchList = ({ matches }) => {
  return (
    <ul>
      {matches
        ? matches.map((match, key) => MatchCard({ match: match, key: key }))
        : null}
    </ul>
  );
};
