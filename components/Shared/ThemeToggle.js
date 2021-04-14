import { useState } from "react";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThemeToggle = () => {
  const [checkedTheme, setCheckedTheme] = useState(false);

  return (
    <label style={{ paddingTop: "10px" }}>
      <Toggle
        className="day-night-toggle"
        icons={{
          checked: <FontAwesomeIcon inverse icon="sun" />,
          unchecked: <FontAwesomeIcon inverse icon="moon" />,
        }}
        onChange={() => {
          setCheckedTheme(!checkedTheme);
        }}
        checked={checkedTheme}
      />
    </label>
  );
};
export default ThemeToggle;
