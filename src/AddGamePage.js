import React, { useState } from "react";
import "./colors.css";

export const AddGamePage = () => {
  const [A, B] =
    useState({
      "corporate-era": false,
      "prelude": false,
    });
  const expansions = ["corporate-era", "prelude"];

  const changeExpansionButtonState = (expansion) => {
    B((states) => {
      states[expansion] = !states[expansion];
      console.log(states);
      return states;
    });
  };
  return (
    <div className="box p-6">
      <div className="field">
        <label className="label">Generazione</label>
        <div className="control">
          <input
            className="input"
            type="number"
            min="1"
            max="100"
            placeholder="Generazione a cui siete arrivati..."
          />
        </div>
      </div>
      <label className="checkbox">Espansioni</label>
      <div className="buttons has-addons">
        {expansions.map((expansion, index) => (
          <button
            key={index}
            onClick={() => changeExpansionButtonState(expansion)}
            className={
              "button" +
              (A[expansion] ? " " + expansion : "")
            }
          >
            {expansion}
          </button>
        ))}
      </div>
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-success"
            type="text"
            placeholder="Text input"
            value="bulma"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </div>
        <p className="help is-success">This username is available</p>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-danger"
            type="email"
            placeholder="Email input"
            value="hello@"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p className="help is-danger">This email is invalid</p>
      </div>

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea className="textarea" placeholder="Textarea"></textarea>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" />I agree to the{" "}
            <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="radio">
            <input type="radio" name="question" />
            Yes
          </label>
          <label className="radio">
            <input type="radio" name="question" />
            No
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </div>
  );
};
