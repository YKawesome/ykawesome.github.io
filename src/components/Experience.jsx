import { useState } from "react";
import { experience } from "../data/experience";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const parseMonth = (value) => value.split("-").map(Number);
const monthIndex = (value) => {
  const [year, month] = parseMonth(value);
  return year * 12 + month - 1;
};

// The timeline runs from the earliest start to today, in months.
const today = new Date();
const now = today.getFullYear() * 12 + today.getMonth() + today.getDate() / 31;
const first = Math.min(...experience.map((item) => monthIndex(item.start)));
const span = now - first;
const position = (index) => (index - first) / span;
const years = [];
for (let year = Math.floor(first / 12) + 1; year * 12 < now; year++) years.push(year);

function formatDates({ start, end }) {
  const [startYear, startMonth] = parseMonth(start);
  if (!end) return `${monthNames[startMonth - 1]} ${startYear} – present`;
  const [endYear, endMonth] = parseMonth(end);
  return startYear === endYear
    ? `${monthNames[startMonth - 1]} – ${monthNames[endMonth - 1]} ${endYear}`
    : `${monthNames[startMonth - 1]} ${startYear} – ${monthNames[endMonth - 1]} ${endYear}`;
}

function barPosition({ start, end }) {
  const from = monthIndex(start);
  // End months are inclusive, so a finished role fills its last month.
  const to = end ? Math.min(monthIndex(end) + 1, now) : now;
  return { "--start": position(from), "--length": (to - from) / span };
}

// Odd split results are the **marked** phrases.
const withHighlights = (text) => text.split(/\*\*(.+?)\*\*/).map((part, index) => (index % 2 ? <strong key={index}>{part}</strong> : part));

function Experience() {
  const [active, setActive] = useState(null);
  const pointTo = (id) => ({ onMouseEnter: () => setActive(id), onMouseLeave: () => setActive(null) });

  return (
    <section id="experience" className="experience-section section-shell" aria-labelledby="experience-heading">
      <div className="experience-intro">
        <div data-reveal="heading"><h2 id="experience-heading">work & experience.</h2><p>Most of these overlap. Here’s how they line up.</p></div>
        {/* The rows below carry the same dates, so the chart is visual only. */}
        <div className="experience-timeline" data-reveal style={{ "--reveal-delay": "120ms" }} data-has-active={active ? "" : undefined} aria-hidden="true">
          <div className="timeline-axis">
            {years.map((year) => <span key={year} style={{ "--at": position(year * 12) }}><span className="timeline-century">{String(year).slice(0, 2)}</span>{String(year).slice(2)}</span>)}
            <span className="timeline-now">now</span>
          </div>
          {experience.map((item) => (
            <div className="timeline-row" key={item.id} data-active={active === item.id || undefined} {...pointTo(item.id)}>
              <span className="timeline-label">{item.short}</span>
              <span className="timeline-track"><span className="timeline-bar" style={barPosition(item)} /></span>
            </div>
          ))}
        </div>
      </div>
      <div className="experience-list">
        {experience.map((item, index) => (
          <article className="experience-row" key={item.id} data-reveal="row" data-active={active === item.id || undefined} style={{ "--reveal-delay": `${index % 3 * 70}ms` }} {...pointTo(item.id)} onFocus={() => setActive(item.id)} onBlur={() => setActive(null)}>
            <span className="experience-badge" aria-hidden="true">
              <span className={`experience-logo experience-logo--${item.logoVariant ?? "light"}`}>
                <img src={item.logo} alt="" width="160" height="160" loading="lazy" decoding="async" />
              </span>
              <img className="experience-sticker" src={item.reaction} alt="" width="160" height="160" loading="lazy" decoding="async" />
            </span>
            <div className="experience-meta"><h3>{item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer">{item.organization} <span aria-hidden="true">↗</span></a> : item.organization}</h3><p>{item.role}</p><span>{formatDates(item)}</span></div>
            <div className="experience-description">
              <p>{withHighlights(item.description)}</p>
              {item.links && (
                <div className="experience-links">
                  {item.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"><span>{link.label}</span> <span aria-hidden="true">↗</span></a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
