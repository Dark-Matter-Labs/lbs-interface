import i18next from "i18next";
import { useState } from "react";
const options = [
  { id: 0, name: "de" },
  { id: 1, name: "en" },
];
export default function LangSelector() {
  const [selectedLang, setSelectedLang] = useState("de");
  const setLang = (value) => {
    setSelectedLang(value);
    i18next.changeLanguage(value, (err, t) => {
      if (err) return console.log("something went wrong loading", err);
      t("key"); // -> same as i18next.t
    });
  };
  return (
    <div className="">
      <select
        id="lang"
        onChange={(e) => setLang(e.target.value)}
        name="lang"
        className="bold-intro-sm rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 uppercase"
        defaultValue={selectedLang}
      >
        {options.map((o) => (
          <option key={o.id} value={o.name}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}
