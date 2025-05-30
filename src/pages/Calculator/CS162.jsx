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
    <div className="hero bg-base-200 min-h-screen pb-5">
      <div className="hero-content text-center">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4">CS162 Grade Calculator</h2>
          <form className="space-y-6">
            {/* Pre-lecture */}
            <div className="card bg-base-300 shadow-lg p-4">
              <h3 className="font-semibold mb-2">Pre-lecture Preparation & Artifacts (15%)</h3>
              <div className="flex flex-col gap-2">
                  <fieldset className="form-control w-full">
                    <legend className="fieldset-legend">Average Score (%)</legend>
                    <input type="number" name="preLecture" className="input input-bordered w-full" placeholder="e.g. 90" />
                  </fieldset>
                  <div className="flex gap-4 justify-center">
                    {['art1', 'art2', 'art3'].map((name, i) => (
                      <label className="form-control flex items-center gap-2" key={name}>
                        <span className="label-text">ART{i + 1}</span>
                        <input type="checkbox" className="toggle" name={name} />
                      </label>
                    ))}
                  </div>
              </div>
            </div>

            {/* Mid Exams */}
            <div className="card bg-base-300 shadow-lg p-4">
              <h3 className="font-semibold mb-2">Mid-quarter Exams (40%)</h3>
              {[1, 2, 3, 4].map(n => (
                <fieldset className="form-control w-full" key={`mid${n}`}>
                  <legend className="fieldset-legend">Exam {n} Score (Out of 10)</legend>
                  <input type="number" name={`mid${n}`} max="10" className="input input-bordered w-full" placeholder="e.g. 9" />
                </fieldset>
              ))}
            </div>

            {/* Core Topics */}
            <div className="card bg-base-300 shadow-lg p-4">
              <h3 className="font-semibold mb-2">Core Topics Competency (45%)</h3>
              {[
                ['regular', 'Not Regular (Out of 2.5)', '2.5'],
                ['contextFree', 'Not Context-Free (Out of 2.5)', '2.5'],
                ['undecidable', 'Not Decidable (Out of 2)', '2'],
                ['npcomplete', 'NP-Complete (Out of 2)', '2'],
              ].map(([name, label, max]) => (
                <fieldset className="form-control w-full" key={name}>
                  <legend className="fieldset-legend">{label}</legend>
                  <input type="number" name={name} max={max} className="input input-bordered w-full" placeholder={`e.g. ${max}`} />
                </fieldset>
              ))}
            </div>

            <button type="button" onClick={handleCalculate} className="btn btn-primary w-full shadow-lg">
              Calculate Grade
            </button>
          </form>

          <div className="mt-8 card bg-base-300 shadow-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Estimated Final Grade:</h3>
            <div className="text-2xl font-bold">{finalGrade}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CS162;