import { useEffect } from "react";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const ThemeToggle = ({
  checkedTheme,
  setCheckedTheme,
  onChange,
  toggleTheme,
  theme,
}) => {
  const router = useRouter();
  useEffect(() => {
    const themes = localStorage.getItem("theme");

    if (themes === "Dark") {
      if (!window.__isThemeLoaded) {
        window.__isThemeLoaded = true;
        !Boolean(theme.type === "dark") && onChange();
      }
      setCheckedTheme(true);
    }
  }, [router]);

  return (
    <label style={{ paddingTop: "10px" }}>
      <Toggle
        className="day-night-toggle"
        icons={{
          checked: <FontAwesomeIcon inverse icon="sun" />,
          unchecked: <FontAwesomeIcon inverse icon="moon" />,
        }}
        onChange={() => {
          onChange();
          setCheckedTheme(!checkedTheme);
          localStorage.setItem("theme", checkedTheme ? "Light" : "Dark");
        }}
        checked={checkedTheme}
      />
    </label>
  );
};
export default ThemeToggle;
