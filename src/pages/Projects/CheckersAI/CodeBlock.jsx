import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import "prismjs/components/prism-python"; // Python syntax highlighting
import { useEffect } from "react";


const CodeBlock = () => {
  useEffect(() => {
    Prism.highlightAll(); // Apply syntax highlighting after render
  }, []);

  return (
    <div className="w-full mockup-code">
      <pre className="language-python">
        <code className="language-python">
          {`
from dataclasses import dataclass, field
@dataclass
class Node:
    parent: "Node"
    move: Move
    player: str
    children: list["Node"] = field(default_factory=list)
    outcome: int = NO_WIN
    wins: int = 0
    simulations: int = 0
    capture: bool = False`}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;