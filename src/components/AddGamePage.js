import React, { useState, useEffect, useRef } from "react";
import "../css/colors.css";
import { getLatestMatchPointsByUsername, checkUsernameExistance, addMatch } from "../utils/queries";
import { deepClone, getWinner, numberOfTrueValues } from "../utils/utils";

export const AddGamePage = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const playersUsernameRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  // EXPANSIONS
  const expansions = ["prelude", "corporate-era"];
  const [expansionButtonsState, setExpansionButtonState] = useState({
    prelude: false,
    "corporate-era": false,
  });

  // MILESTONES
  const milestones = [
    "terraformatore",
    "sindaco",
    "costruttore",
    "giardiniere",
    "pianificatore",
  ];
  const [milestoneButtonsState, setMilestoneButtonState] = useState({
    terraformatore: false,
    sindaco: false,
    costruttore: false,
    giardiniere: false,
    pianificatore: false,
  });

  // AWARDS
  const awards = [
    "proprietario-terriero",
    "banchiere",
    "scienziato",
    "esperto-di-termodinamica",
    "minatore",
  ];
  const [awardButtonsState, setAwardButtonState] = useState({
    "proprietario-terriero": false,
    banchiere: false,
    scienziato: false,
    "esperto-di-termodinamica": false,
    minatore: false,
  });

  const handleOnClickExpansionButtons = (expansion) => {
    const temp = deepClone(expansionButtonsState);
    temp[expansion] = !temp[expansion];
    setExpansionButtonState(temp);
  };

  const handleOnClickMilestoneButtons = (milestone) => {
    const temp = deepClone(milestoneButtonsState);

    // make sure that there are less/equals than 3 milestones selected
    const counter = numberOfTrueValues(milestoneButtonsState);
    if (counter == 3 && !temp[milestone]) return null;

    temp[milestone] = !temp[milestone];
    setMilestoneButtonState(temp);
  };

  const handleOnClickAwardButtons = (award) => {
    const temp = deepClone(awardButtonsState);
    var counter = numberOfTrueValues(awardButtonsState);
    if (counter == 3 && !temp[award]) return null;
    temp[award] = !temp[award];
    setAwardButtonState(temp);
  };

  const handleNumberOfPlayersOnChange = (e) => {
    setNumberOfPlayers(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setMessage("")
    setLoading(true)

    const usernames = []
    var playersStats = []

    playersUsernameRefs.forEach((playerUsernameRef, index) => {
      return index < numberOfPlayers
        ? usernames.push(playerUsernameRef.current.value)
        : null;
    });

    for (const username of usernames) {
      const playerObject = {}
      try {
        await checkUsernameExistance(username)
      } catch(e) {
        setError("L'username "+ username +"non esiste, prova con un altro.")
        setLoading(false)
        return
      }
      try {
        const userLatestMatchPoint = await getLatestMatchPointsByUsername(username)
        playerObject["points"] = userLatestMatchPoint
        playerObject["username"] = username
        playersStats.push(playerObject)
      } catch(e) {
        setError(e.message)
        setLoading(false)
        return
      }
    }
    const winner = getWinner(playersStats)
    const match = {
      winner: winner,
      partecipants: playersStats
    }
    await addMatch(match)
    setMessage("Match aggiunto al server! vai subito a vedere...")
    setLoading(false)
  };

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-7-tablet is-7-desktop is-7-widescreen">
              <form onSubmit={handleSubmit} className="box">
                {error && <p className="has-text-danger">{error}</p>}
                {message && <p className="has-text-success">{message}</p>}
                <label className="label">Espansioni</label>
                <div className="buttons has-addons">
                  {expansions.map((expansion, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleOnClickExpansionButtons(expansion)}
                        className={
                          "button" +
                          (expansionButtonsState[expansion]
                            ? " " + expansion
                            : "")
                        }
                      >
                        {expansion}
                      </div>
                    );
                  })}
                </div>
                <div className="field">
                  <label className="label">Numero di giocatori</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select onChange={handleNumberOfPlayersOnChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={4}>5</option>
                      </select>
                    </div>
                  </div>
                </div>
                {playersUsernameRefs.map((playerUsernameRef, index) => {
                  return index < numberOfPlayers ? (
                    <div key={index} className="field">
                      <label className="label is-size-7">
                        Username del giocatore {index + 1}
                      </label>
                      <input
                        className="input"
                        type="text"
                        required
                        ref={playerUsernameRef}
                      />
                    </div>
                  ) : null;
                })}

                <div className="field">
                  <button
                    className="button is-success is-fullwidth"
                    disabled={loading}
                  >
                    Genera dati della partita
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <div className="box p-6">
    //   <div className="field">
    //     <label className="label">Generazione</label>
    //     <div className="control">
    //       <input
    //         className="input"
    //         type="number"
    //         min="1"
    //         max="100"
    //         placeholder="Generazione a cui siete arrivati..."
    //       />
    //     </div>
    //   </div>

    //   <label className="label">Espansioni</label>
    //   <div className="buttons has-addons">
    //     {expansions.map((expansion) => {
    //       return (
    //         <button
    //           onClick={() => handleOnClickExpansionButtons(expansion)}
    //           className={
    //             "button" +
    //             (expansionButtonsState[expansion] ? " " + expansion : "")
    //           }
    //         >
    //           {expansion}
    //         </button>
    //       );
    //     })}
    //   </div>

    //   <label className="label">Milestones</label>
    //   <div className="buttons has-addons">
    //     {milestones.map((milestone, index) => {
    //       return (
    //         <button
    //           key={index}
    //           onClick={() => handleOnClickMilestoneButtons(milestone)}
    //           className={
    //             "button" +
    //             (milestoneButtonsState[milestone] ? " " + milestone : "")
    //           }
    //         >
    //           {milestone}
    //         </button>
    //       );
    //     })}
    //   </div>
    //   <label className="label">Awards</label>
    //   <div className="buttons has-addons">
    //     {awards.map((award, index) => {
    //       return (
    //         <button
    //           key={index}
    //           onClick={() => handleOnClickAwardButtons(award)}
    //           className={
    //             "button" +
    //             (awardButtonsState[award] ? " " + award : "")
    //           }
    //         >
    //           {award}
    //         </button>
    //       );
    //     })}
    //   </div>
    //   <div className="field">
    //     <label className="label">Username</label>
    //     <div className="control has-icons-left has-icons-right">
    //       <input
    //         className="input is-success"
    //         type="text"
    //         placeholder="Text input"
    //         value="bulma"
    //       />
    //       <span className="icon is-small is-left">
    //         <i className="fas fa-user"></i>
    //       </span>
    //       <span className="icon is-small is-right">
    //         <i className="fas fa-check"></i>
    //       </span>
    //     </div>
    //     <p className="help is-success">This username is available</p>
    //   </div>

    //   <div className="field">
    //     <label className="label">Email</label>
    //     <div className="control has-icons-left has-icons-right">
    //       <input
    //         className="input is-danger"
    //         type="email"
    //         placeholder="Email input"
    //         value="hello@"
    //       />
    //       <span className="icon is-small is-left">
    //         <i className="fas fa-envelope"></i>
    //       </span>
    //       <span className="icon is-small is-right">
    //         <i className="fas fa-exclamation-triangle"></i>
    //       </span>
    //     </div>
    //     <p className="help is-danger">This email is invalid</p>
    //   </div>

    //   <div className="field">
    //     <label className="label">Subject</label>
    //     <div className="control">
    //       <div className="select">
    //         <select>
    //           <option>Select dropdown</option>
    //           <option>With options</option>
    //         </select>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="field">
    //     <label className="label">Message</label>
    //     <div className="control">
    //       <textarea className="textarea" placeholder="Textarea"></textarea>
    //     </div>
    //   </div>

    //   <div className="field">
    //     <div className="control">
    //       <label className="checkbox">
    //         <input type="checkbox" />I agree to the{" "}
    //         <a href="#">terms and conditions</a>
    //       </label>
    //     </div>
    //   </div>

    //   <div className="field">
    //     <div className="control">
    //       <label className="radio">
    //         <input type="radio" name="question" />
    //         Yes
    //       </label>
    //       <label className="radio">
    //         <input type="radio" name="question" />
    //         No
    //       </label>
    //     </div>
    //   </div>

    //   <div className="field is-grouped">
    //     <div className="control">
    //       <button className="button is-link">Submit</button>
    //     </div>
    //     <div className="control">
    //       <button className="button is-link is-light">Cancel</button>
    //     </div>
    //   </div>
    // </div>
  );
};
