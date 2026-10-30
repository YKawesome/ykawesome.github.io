// Wraps **marked** phrases in <strong>, which the cards draw as highlighter swipes.
const withHighlights = (text) => text.split(/\*\*(.+?)\*\*/).map((part, index) => (index % 2 ? <strong key={index}>{part}</strong> : part));

export default withHighlights;
