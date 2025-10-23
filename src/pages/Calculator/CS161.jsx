import { useState } from "react";
function CS161() {
  const [finalGrade, setFinalGrade] = useState("--");

  const handleCalculate = (e) => {
    const form = e.target.form;
    const getVal = (name) => parseFloat(form[name]?.value) || 0;
    const getCheck = (name) => (form[name]?.checked ? 1 : 0);

    const preLecture = getVal("preLecture") * 0.07;
    const dpci = getCheck("dpci") * 1.5;
    const apsa = getCheck("apsa") * 1.5;

    const exam1 = (getVal("exam1") / 10) * 10; // Normalize to percentage
    const exam2 = (getVal("exam2") / 10) * 10;

    // Each input is out of its respective max, convert to percent contribution
    const divideConquer = (getVal("divideConquer") / 1) * 10;
    const dynamicProgramming = (getVal("dynamicProgramming") / 2) * 20;
    const greedyProof = (getVal("greedyProof") / 2) * 20;
    const networkFlow = (getVal("networkFlow") / 2) * 20;

    const coreTopics =
      divideConquer + dynamicProgramming + greedyProof + networkFlow;

    const total = preLecture + dpci + apsa + exam1 + exam2 + coreTopics;
    setFinalGrade(total.toFixed(2));
  };

  return (
    <div className="pb-5 hero bg-base-200 min-h-fit">
      <div className="text-center hero-content">
        <div className="w-full max-w-2xl">
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col w-full gap-6 md:w-1/2">
                <div className="h-full p-4 shadow-lg card bg-base-300">
                  <h3 className="mb-2 font-semibold">
                    Pre-lecture Preparation & Artifacts (10%)
                  </h3>
                  <div className="flex flex-col gap-2">
                    <fieldset className="w-full form-control">
                      <legend className="fieldset-legend">
                        Average Score (%)
                      </legend>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full input input-bordered"
                        placeholder="e.g. 95"
                        name="preLecture"
                      />
                    </fieldset>
                    <div className="flex justify-center gap-4">
                      <label className="flex items-center form-control gap-2">
                        <span className="label-text">DPCI</span>
                        <input type="checkbox" className="toggle" name="dpci" />
                      </label>
                      <label className="flex items-center form-control gap-2">
                        <span className="label-text">APSA</span>
                        <input type="checkbox" className="toggle" name="apsa" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-4 shadow-lg card bg-base-300">
                  <h3 className="mb-2 font-semibold">
                    Mid-quarter Exams (20%)
                  </h3>
                  <div className="flex flex-col gap-2">
                    <fieldset className="w-full form-control">
                      <legend className="fieldset-legend">
                        Exam 1 Score (out of 10)
                      </legend>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        className="w-full input input-bordered"
                        placeholder="e.g. 9"
                        name="exam1"
                      />
                    </fieldset>
                    <fieldset className="w-full form-control">
                      <legend className="fieldset-legend">
                        Exam 2 Score (out of 10)
                      </legend>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        className="w-full input input-bordered"
                        placeholder="e.g. 8.5"
                        name="exam2"
                      />
                    </fieldset>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="p-4 shadow-lg card bg-base-300">
                  <h3 className="mb-2 font-semibold">
                    Core Topics Competency at Exams (70%)
                  </h3>
                  <div className="flex flex-col gap-2">
                    <fieldset className="w-full form-control">
                      <legend className="fieldset-legend">
                        Divide & Conquer (out of 1) (10%)
                      </legend>
                      <input
                        type="number"
                        min="0"
                        max="1"
                        className="w-full input input-bordered"
                        placeholder="e.g. 1"
                        name="divideConquer"
                      />
                    </fieldset>
                    <fieldset className="w-full form-control">
                      <legend className="fieldset-legend">
                        Dynamic Programming (out of 2) (20%)
                      </legend>
                      <input
                        type="number"
                        min="0"
                        max="2"
                        className="w-full input input-bordered"
                        placeholder="e.g. 2"
                        name="dynamicProgramming"
                      />
                    </fieldset>
                    <fieldset className="w-full form-control">
                      <legend className="fieldset-legend">
                        Greedy Algorithm Proof (out of 2) (20%)
                      </legend>
                      <input
                        type="number"
                        min="0"
                        max="2"
                        className="w-full input input-bordered"
                        placeholder="e.g. 2"
                        name="greedyProof"
                      />
                    </fieldset>
                    <fieldset className="w-full form-control">
                      <legend className="fieldset-legend">
                        Network Flow (out of 2) (20%)
                      </legend>
                      <input
                        type="number"
                        min="0"
                        max="2"
                        className="w-full input input-bordered"
                        placeholder="e.g. 2"
                        name="networkFlow"
                      />
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full shadow-lg btn btn-secondary"
            >
              Calculate Grade
            </button>
          </form>

          <div className="p-4 mt-8 shadow-lg card bg-base-300">
            <h3 className="mb-2 text-xl font-semibold">
              Estimated Final Grade:
            </h3>
            <div className="text-2xl font-bold" id="final-grade">
              {finalGrade}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CS161;
