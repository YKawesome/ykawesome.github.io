import { useState } from "react";

function SkewedSlots() {
  // State for the three slot digits
  const [slot1, setSlot1] = useState("");
  const [slot2, setSlot2] = useState("");
  const [slot3, setSlot3] = useState("");

  // States for checkboxes
  const [rcaPS2, setRcaPS2] = useState(false);
  const [parallelPort, setParallelPort] = useState(false);
  const [unlitBOB, setUnlitBOB] = useState(false);
  const [serialPort, setSerialPort] = useState(false);

  // States for other bomb info
  const [litIndicators, setLitIndicators] = useState("");
  const [unlitIndicators, setUnlitIndicators] = useState("");
  const [batteries, setBatteries] = useState("");

  // Final output
  const [result, setResult] = useState([0, 0, 0]);

  // Here’s where you’d implement all the puzzle logic
  const handleSubmit = () => {
    // 1. Parse your input digits
    const digit1 = parseInt(slot1, 10) || 0;
    const digit2 = parseInt(slot2, 10) || 0;
    const digit3 = parseInt(slot3, 10) || 0;

    // 2. Gather additional data (checkboxes, # indicators, # batteries, etc.)
    const litCount = parseInt(litIndicators, 10) || 0;
    const unlitCount = parseInt(unlitIndicators, 10) || 0;
    const batteryCount = parseInt(batteries, 10) || 0;

    // 3. Apply your “Skewed Slots” transformation rules:
    //    - This is just a placeholder showing how you might structure it.

    let od1 = digit1;
    let od2 = digit2;
    let od3 = digit3;

    let digits = [digit1, digit2, digit3];
    let odgs = [od1, od2, od3];

    // All Slots
    for (let i = 0; i < 3; i++) {
      if (digits[i] === 2) {
        digits[i] = 5;
      }
      if (digits[i] === 7) {
        digits[i] = 0;
      }
      digits[i] += litCount - unlitCount;

      if (digits[i] % 3 === 0) {
        digits[i] += 4;
      } else if (digits[i] > 7) {
        digits[i] *= 2;
      } else if (digits[i] < 3 && digits[i] % 2 === 0) {
        digits[i] = ~~(digits[i] / 2);
      } else if (rcaPS2) {
        continue;
      } else {
        digits[i] = odgs[i] + batteryCount;
      }


    }

    // 4. Format a result or final output
    // const finalOutput = `${digits[0]} ${digits[1]} ${digits[2]}`;
    const finalOutput = digits

    // 5. Store it in state for display
    setResult(finalOutput);
  };

  return (
    <>
      {/* Header */}
      <div className="hero bg-secondary text-secondary-content h-[12vh]">
        <div className="flex flex-col items-center text-center hero-content">
          <p className="text-2xl font-bold md:text-5xl">On the Subject of Skewed Slots</p>
          <p className="text-lg md:text-xl">Follow the rules and enter your digits below.</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center p-4 space-y-4 bg-base-100 text-base-content">
        {/* Slot inputs */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Slot 1"
            className="w-16 text-center input input-bordered"
            value={slot1}
            onChange={(e) => setSlot1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Slot 2"
            className="w-16 text-center input input-bordered"
            value={slot2}
            onChange={(e) => setSlot2(e.target.value)}
          />
          <input
            type="text"
            placeholder="Slot 3"
            className="w-16 text-center input input-bordered"
            value={slot3}
            onChange={(e) => setSlot3(e.target.value)}
          />
        </div>

        {/* Fieldset for ports */}
        <fieldset className="w-64 p-4 border fieldset bg-base-100 border-base-300 rounded-box h0">
          <legend className="font-semibold fieldset-legend">Ports</legend>
          <label className="flex items-center my-1 fieldset-label space-x-2">
            <input
              type="checkbox"
              className="toggle"
              checked={rcaPS2}
              onChange={(e) => setRcaPS2(e.target.checked)}
            />
            <span>RCA / PS2</span>
          </label>
          <label className="flex items-center my-1 fieldset-label space-x-2">
            <input
              type="checkbox"
              className="toggle"
              checked={parallelPort}
              onChange={(e) => setParallelPort(e.target.checked)}
            />
            <span>Parallel Port</span>
          </label>
          <label className="flex items-center my-1 fieldset-label space-x-2">
            <input
              type="checkbox"
              className="toggle"
              checked={unlitBOB}
              onChange={(e) => setUnlitBOB(e.target.checked)}
            />
            <span>Unlit BOB</span>
          </label>
          <label className="flex items-center my-1 fieldset-label space-x-2">
            <input
              type="checkbox"
              className="toggle"
              checked={serialPort}
              onChange={(e) => setSerialPort(e.target.checked)}
            />
            <span>Serial Port</span>
          </label>
        </fieldset>

        {/* Fieldset for indicators & batteries */}
        <fieldset className="w-64 p-4 border fieldset bg-base-100 border-base-300 rounded-box">
          <legend className="font-semibold fieldset-legend">Indicators & Batteries</legend>
          <label className="flex flex-col my-2 fieldset-label">
            <span>Lit Indicators</span>
            <input
              type="text"
              placeholder="0"
              className="w-24 input input-bordered"
              value={litIndicators}
              onChange={(e) => setLitIndicators(e.target.value)}
            />
          </label>
          <label className="flex flex-col my-2 fieldset-label">
            <span>Unlit Indicators</span>
            <input
              type="text"
              placeholder="0"
              className="w-24 input input-bordered"
              value={unlitIndicators}
              onChange={(e) => setUnlitIndicators(e.target.value)}
            />
          </label>
          <label className="flex flex-col my-2 fieldset-label">
            <span>Batteries</span>
            <input
              type="text"
              placeholder="0"
              className="w-24 input input-bordered"
              value={batteries}
              onChange={(e) => setBatteries(e.target.value)}
            />
          </label>
        </fieldset>

        {/* Submit button */}
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>

        {/* Result output */}

        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Slot 1"
            className="w-16 text-center input input-bordered"
            value={result[0]}
            disabled
          />
          <input
            type="number"
            placeholder="Slot 2"
            className="w-16 text-center input input-bordered"
            value={result[1]}
            disabled
          />
          <input
            type="number"
            placeholder="Slot 3"
            className="w-16 text-center input input-bordered"
            value={result[2]}
            disabled
          />

        </div>
      </div>
    </>
  );
}

export default SkewedSlots;