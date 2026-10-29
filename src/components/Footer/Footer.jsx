function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div><span>Yousef Khan</span><p>thanks for stopping by :D</p></div>
      <nav aria-label="Social links">
        <a href="https://github.com/YKawesome" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/theyousefkhan/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href="mailto:theyousefkhan@gmail.com">Email ↗</a>
      </nav>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Yousef Khan</span></div>
    </footer>
  );
}

export default Footer;
