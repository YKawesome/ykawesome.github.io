import { useState } from "react";
import CS161 from "./CS161";
import CS162 from "./CS162";
import Empty from "./Empty";

function Calculator() {
  const [selected, setSelected] = useState("");
  return (
    <section className="bg-base-200 min-h-[65vh] flex flex-col items-center justify-center py-10" aria-labelledby="calculator-heading">
      <div className="flex flex-col items-center gap-5 py-4">
        <h1 id="calculator-heading" className="text-4xl font-bold">Grade Calculator</h1>
        <label className="fieldset">
          <span className="fieldset-legend">UCI course</span>
          <select value={selected} onChange={(event) => setSelected(event.target.value)} className="select select-lg">
            <option value="" disabled>Pick a calculator</option>
            <option value="CS161">CS161</option>
            <option value="CS162">CS162</option>
          </select>
        </label>
      </div>
      {selected === "" && <Empty />}
      {selected === "CS161" && <CS161 />}
      {selected === "CS162" && <CS162 />}
    </section>
  );
}

export default Calculator;
