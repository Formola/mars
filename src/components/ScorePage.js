import React from "react";
import { useLocation } from "react-router-dom";
export const ScorePage = () => {
  const { state } = useLocation();
  const partecipants = state ? state.partecipants : null;
  const winner = state ? state.winner : null;
  return state ? (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <div className="box">
                <div className="is-flex is-justify-content-space-between p-2">
                  <div>
                    <p className="is-size-3">{winner.username}</p>
                    <p className="is-size-6">
                      {"as " + winner.points.corporation}
                    </p>
                  </div>
                  <p className="is-size-1">{winner.points.finalPoints}</p>
                </div>
                <div></div>
                Partecipanti:
                <ul>
                  {partecipants.map((partecipant) => (
                    <li>
                      {partecipant.username +
                        ": " +
                        partecipant.points.finalPoints}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body container">
        <p className="is-size-1">
          Ma quale partita vuoi vedere salvatore? torna indietro e fa o brav...
        </p>
      </div>
    </section>
  );
};
