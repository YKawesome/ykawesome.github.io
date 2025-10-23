import { useState } from 'react';

function CS162() {
  const [finalGrade, setFinalGrade] = useState('--');

  const handleCalculate = (e) => {
    const form = e.target.form;
    const getVal = (name) => parseFloat(form[name]?.value) || 0;

    const art1 = form.art1?.checked ? 1 : 0;
    const art2 = form.art2?.checked ? 1 : 0;
    const art3 = form.art3?.checked ? 1 : 0;

    // Pre-lecture: 12%
    const preLecture = getVal('preLecture') * 0.12;
    const arts = (art1 + art2 + art3) * 1;

    // Mid-quarter exams: 10% each
    const mid1 = getVal('mid1') / 10 * 10;
    const mid2 = getVal('mid2') / 10 * 10;
    const mid3 = getVal('mid3') / 10 * 10;
    const mid4 = getVal('mid4') / 10 * 10;
    const mids = mid1 + mid2 + mid3 + mid4;

    // Core Topics: Top 2 = 12.5%, Bottom 2 = 10%
    const scores = [
      getVal('regular') / 2.5 * 100,
      getVal('contextFree') / 2.5 * 100,
      getVal('undecidable') / 2 * 100,
      getVal('npcomplete') / 2 * 100,
    ].sort((a, b) => b - a);

    const coreTopics = (scores[0] * 0.125) + (scores[1] * 0.125) + (scores[2] * 0.10) + (scores[3] * 0.10);

    const total = preLecture + arts + mids + coreTopics;
    setFinalGrade(total.toFixed(2));
  };

  return (
    <div className="pb-5 hero bg-base-200 min-h-fit">
      <div className="text-center hero-content">
        <div className="sm:w-2xl">
          <form className="space-y-6">
            {/* Pre-lecture Preparation card moved above the row */}
            <div className="h-full p-4 shadow-lg card bg-base-300">
              <h3 className="mb-2 font-semibold">Pre-lecture Preparation & Artifacts (15%)</h3>
              <div className="flex flex-col gap-2">
                  <fieldset className="w-full form-control">
                    <legend className="fieldset-legend">Average Score (%)</legend>
                    <input type="number" name="preLecture" className="w-full input input-bordered" placeholder="e.g. 90" />
                  </fieldset>
                  <div className="flex justify-center gap-4">
                    {['art1', 'art2', 'art3'].map((name, i) => (
                      <label className="flex items-center form-control gap-2" key={name}>
                        <span className="label-text">ART{i + 1}</span>
                        <input type="checkbox" className="toggle" name={name} />
                      </label>
                    ))}
                  </div>
              </div>
            </div>

            <div className="flex flex-col items-stretch md:flex-row gap-6">
              {/* Core Topics column */}
              <div className="w-full h-full md:w-1/2">
                <div className="h-full p-4 shadow-lg card bg-base-300">
                  <h3 className="mb-2 font-semibold">Core Topics Competency (45%)</h3>
                  {[
                    ['regular', 'Not Regular (Out of 2.5)', '2.5'],
                    ['contextFree', 'Not Context-Free (Out of 2.5)', '2.5'],
                    ['undecidable', 'Not Decidable (Out of 2)', '2'],
                    ['npcomplete', 'NP-Complete (Out of 2)', '2'],
                  ].map(([name, label, max]) => (
                    <fieldset className="w-full form-control" key={name}>
                      <legend className="fieldset-legend">{label}</legend>
                      <input type="number" name={name} max={max} className="w-full input input-bordered" placeholder={`e.g. ${max}`} />
                    </fieldset>
                  ))}
                </div>
              </div>

              {/* Mid Exams card */}
              <div className="w-full h-full md:w-1/2">
                <div className="h-full p-4 shadow-lg card bg-base-300">
                  <h3 className="mb-2 font-semibold">Mid-quarter Exams (40%)</h3>
                  {[1, 2, 3, 4].map(n => (
                    <fieldset className="w-full form-control" key={`mid${n}`}>
                      <legend className="fieldset-legend">Exam {n} Score (Out of 10)</legend>
                      <input type="number" name={`mid${n}`} max="10" className="w-full input input-bordered" placeholder="e.g. 9" />
                    </fieldset>
                  ))}
                </div>
              </div>
            </div>

            <button type="button" onClick={handleCalculate} className="w-full shadow-lg btn btn-secondary">
              Calculate Grade
            </button>
          </form>

          <div className="p-4 mt-8 shadow-lg card bg-base-300">
            <h3 className="mb-2 text-xl font-semibold">Estimated Final Grade:</h3>
            <div className="text-2xl font-bold">{finalGrade}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CS162;