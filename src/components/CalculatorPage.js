import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  calculateFinalPoints,
  deepClone,
  numberOfTrueValues,
} from "../utils/utils";
import { updateLatestPlayerPoints } from "../utils/queries";

export default function CalculatorPage() {
  const baseCorporations = [
    "Credicor",
    "Ecoline",
    "Helion",
    "Mining Guild",
    "Interplanetary Cinematic",
    "Inventrix",
    "Phobolog",
    "Tharsis Republic",
    "Thorgate",
    "United Nations Mars Initiative",
  ];
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [corporationsList, setCorporationLists] = useState(baseCorporations)

  const corporationRef = useRef();
  const terraformingPointsRef = useRef();
  const cardsPointsRef = useRef();
  const forestsPointsRef = useRef();
  const citiesPointsRef = useRef();

  

  const corporateEraCorporations = ["Teractor", "Saturn Systems"];

  const preludeCorporations = [
    "Cheung Shing Mars",
    "Point Luna",
    "Robinson Industries",
    "Valley Trust",
    "Vitor",
  ];

  const handleOnClickExpansionButtons = (expansion) => {
    const temp = deepClone(expansionButtonsState);
    temp[expansion] = !temp[expansion];
    const newCorporationsList = baseCorporations
    if (temp.prelude) {
      newCorporationsList.push(...preludeCorporations)
    }
    if (temp["corporate-era"]) {
      newCorporationsList.push(...corporateEraCorporations)
    }
    setExpansionButtonState(temp);
    setCorporationLists(newCorporationsList)
    console.log(newCorporationsList)
  };

  // EXPANSIONS
  const expansions = ["prelude", "corporate-era"];
  const [expansionButtonsState, setExpansionButtonState] = useState({
    prelude: false,
    "corporate-era": false,
  });

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
  const [awardPointCheckboxState, setAwardPointCheckboxState] = useState({
    "proprietario-terriero": {
      2: false,
      5: false,
    },
    banchiere: {
      2: false,
      5: false,
    },
    scienziato: {
      2: false,
      5: false,
    },
    "esperto-di-termodinamica": {
      2: false,
      5: false,
    },
    minatore: {
      2: false,
      5: false,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const corporation = corporationRef.current.value
    const terraformingPoints = parseInt(terraformingPointsRef.current.value);
    const cardsPoints = parseInt(cardsPointsRef.current.value);
    const forestsPoints = parseInt(forestsPointsRef.current.value);
    const citiesPoints = parseInt(citiesPointsRef.current.value);
    const milestonesPoints = [];
    const awardsPoints = [];

    // CALCULATE MILESTONES
    Object.entries(milestoneButtonsState).forEach((elementArray) =>
      elementArray[1]
        ? milestonesPoints.push({ milestone: elementArray[0], pv: 5 })
        : null
    );

    // CALCULATE AWARDS
    Object.entries(awardButtonsState).forEach((elementArray) =>
      elementArray[1]
        ? Object.entries(awardPointCheckboxState[elementArray[0]]).forEach(
            (awardStateArray) =>
              awardStateArray[1]
                ? awardsPoints.push({
                    award: elementArray[0],
                    pv: parseInt(awardStateArray[0]),
                  })
                : null
          )
        : null
    );

    const playerPoints = {
      corporation: corporation,
      terraformingPoints: terraformingPoints,
      cardsPoints: cardsPoints,
      forestsPoints: forestsPoints,
      citiesPoints: citiesPoints,
      milestonesPoints: milestonesPoints,
      awardsPoints: awardsPoints,
    };

    const finalPoints = calculateFinalPoints(playerPoints);
    playerPoints["finalPoints"] = finalPoints;
    await updateLatestPlayerPoints(currentUser.uid, playerPoints);
    setMessage(
      "Punteggio finale: " +
        playerPoints.finalPoints +
        "! I dati del form sono stati inviati al server, corri ad aggiungere la partita!"
    );
    setLoading(false);
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

  const handleAwardPointCheckboxOnClick = (e) => {
    const award = e.target.name;
    const checked = e.target.checked;
    const value = e.target.value;
    var temp = deepClone(awardPointCheckboxState);
    temp[award][value] = checked;
    setAwardPointCheckboxState(temp);
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
                  <label className="label">Corporation</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select ref={corporationRef}>
                        {corporationsList.map((corporation, index) => (
                          <option key={index} value={corporation}>{corporation}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Tasso di terraformazione</label>
                  <div className="control">
                    <input
                      type="number"
                      min={20}
                      max={100}
                      placeholder="Inserisci il tuo tasso di terraformazione..."
                      className="input"
                      ref={terraformingPointsRef}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Punti vittoria delle carte</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input"
                      placeholder="Inserisci i punti vittoria accumulati con le carte..."
                      ref={cardsPointsRef}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Milestones</label>
                  <div className="buttons has-addons">
                    {milestones.map((milestone, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() =>
                            handleOnClickMilestoneButtons(milestone)
                          }
                          className={
                            "button" +
                            (milestoneButtonsState[milestone]
                              ? " " + milestone
                              : "")
                          }
                        >
                          {milestone}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Riconoscimenti</label>
                  <div className="buttons has-addons">
                    {awards.map((award, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => handleOnClickAwardButtons(award)}
                          className={
                            "button" +
                            (awardButtonsState[award] ? " " + award : "")
                          }
                        >
                          {award}
                        </div>
                      );
                    })}
                  </div>
                  {awards.map((award, index) => {
                    return awardButtonsState[award] ? (
                      <div
                        key={index}
                        className="field is-flex is-fullwidth is-flex-direction-row is-justify-content-space-between"
                      >
                        <div>{award}</div>
                        <div>
                          <input
                            onClick={handleAwardPointCheckboxOnClick}
                            type="checkbox"
                            className="checkbox"
                            value={2}
                            name={award}
                            disabled={awardPointCheckboxState[award][5]}
                          />
                          2
                          <input
                            onClick={handleAwardPointCheckboxOnClick}
                            type="checkbox"
                            className="checkbox"
                            value={5}
                            name={award}
                            disabled={awardPointCheckboxState[award][2]}
                          />
                          5
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
                <div className="field">
                  <label className="label">Punti delle foreste</label>
                  <div className="control">
                    <input
                      min={0}
                      type="number"
                      className="input"
                      ref={forestsPointsRef}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Punti delle citta</label>
                  <div className="control">
                    <input
                      min={0}
                      type="number"
                      className="input"
                      ref={citiesPointsRef}
                    />
                  </div>
                </div>
                <div className="field">
                  <button
                    className="button is-success is-fullwidth"
                    disabled={loading}
                  >
                    Calcola
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}