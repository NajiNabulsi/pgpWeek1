import React from "react";
import "./option-box.css";

const OptionBox = ({ levelOneChecked, levelTwoChecked, levelThreeChecked }) => {
  return (
    <div className="radio-box_main">
      <p>Select a difficulty:</p>
      <div className="radio-box">
        <div>
          <input
            type="radio"
            name="level"
            value="one"
            onChange={levelOneChecked}
          />
          <label for="huey">Level One</label>
        </div>

        <div>
          <input
            type="radio"
            name="level"
            value="two"
            onChange={levelOneChecked}
          />
          <label for="dewey">Level Two</label>
        </div>

        <div>
          <input
            type="radio"
            name="level"
            value="three"
            onChange={levelOneChecked}
          />
          <label for="louie">Level Three</label>
        </div>
      </div>
    </div>
  );
};

export default OptionBox;
