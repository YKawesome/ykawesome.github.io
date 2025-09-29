import { motion } from "framer-motion";
import { images } from "../../../utils/preloadimages";

export default function OpenlabSetup() {
  const hero = images["nerd.png"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-base-100 min-h-screen"
    >
      <div
        className="hero min-h-[40vh]"
        style={{ backgroundImage: hero ? `url(${hero})` : undefined }}
      >
        <div className="hero-overlay bg-opacity-70" />
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-3xl">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <span className="badge badge-primary badge-outline">UCI</span>
              <span className="badge badge-secondary badge-outline">ICS</span>
              <span className="badge badge-accent badge-outline">Workflow</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Setting Up Openlab Without Crashing Out
            </h1>
            <p className="mt-4 opacity-90 text-lg">
              How to go get a one-command Openlab workflow for ICS classes.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm opacity-80">
              <span>Published: Feb 2025</span>
              <span>Reading time: ~5 min</span>
              <span>Tools: VPN, SSH, VS Code</span>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-invert max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Why This Exists
          </h2>
          <p className="leading-relaxed">
            UCI&apos;s Openlab is the official playground for ICS coursework,
            but the docs are scattered across class Discords, Google Docs, and
            random ICS websites. Chase Carnaroli wrote a great gist (
            <a
              className="link"
              href="https://gist.github.com/ChaseC99/9506cf219ca33c60693ea4c4396a4c19"
              target="_blank"
              rel="noreferrer"
            >
              linked here
            </a>
            ), and this post is my narrative remix of it—everything I actually
            type when helping someone.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Prereqs: An ICS Account
          </h2>
          <p className="leading-relaxed">
            Before touching a terminal, make sure your ICS account is activated.
            It&apos;s separate from your UCInetID password and lives over on the{" "}
            <a
              className="link"
              href="https://www.ics.uci.edu/~lab/students/acct_activate.php"
              target="_blank"
              rel="noreferrer"
            >
              ICS Lab activation page
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            First Connection: VPN + SSH
          </h2>
          <ol className="space-y-3 leading-relaxed">
            <li>Hop onto the UCI VPN (Full Tunnel).</li>
            <li>
              Open your terminal on your laptop—not VS Code yet, just the
              regular shell.
            </li>
            <li>
              Run <code>ssh ucinetid@openlab.ics.uci.edu</code>, swapping in
              your actual UCInetID.
            </li>
            <li>
              When prompted, enter your <em>ICS</em> password. If it hangs,
              double-check the VPN or try <code>ssh -v</code> for verbose hints.
            </li>
          </ol>
          <p className="mt-6 leading-relaxed">
            If everything works, you&apos;ll land on a prompt that looks like:
          </p>
          <pre className="mockup-code text-xs leading-snug my-3">
            <code>{`    panteatr@circinus-30 ~ $`}</code>
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Optional: SSH Keys
          </h2>
          <div className="alert alert-info not-prose my-4">
            <span>no more VPN, no more typing passwords, worth 5 min imo</span>
          </div>
          <ol className="space-y-3 leading-relaxed">
            <li>
              Create a key locally if you don&apos;t have one yet:{" "}
              <code>ssh-keygen</code>.
            </li>
            <li>
              Accept the default file path (<code>~/.ssh/id_rsa.pub</code>) and
              skip a passphrase unless you want one.
            </li>
            <li>
              Print the key so you can copy it:{" "}
              <code>cat ~/.ssh/id_rsa.pub</code>. Grab the entire line that
              starts with <code>ssh-rsa</code>.
            </li>
            <li>Reconnect to Openlab with your password one last time.</li>
            <li>
              Append the key to the authorized list:
              <pre className="mockup-code text-xs leading-snug my-3">
                <code>{`    mkdir -p ~/.ssh
    printf "PASTE IT HERE" >> ~/.ssh/authorized_keys`}</code>
              </pre>
            </li>
          </ol>
          <p className="leading-relaxed">
            Disconnect and try <code>ssh ucinetid@openlab.ics.uci.edu</code>{" "}
            again—if it drops you straight into the shell, the key works and you
            can leave the VPN behind.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Quality of Life: SSH Config Alias
          </h2>
          <p className="leading-relaxed">
            Typing the full host every time is annoying. Create{" "}
            <code>~/.ssh/config</code> on your laptop and add:
          </p>
          <pre className="mockup-code text-xs leading-snug my-3">
            <code>{`    Host ics
        User ucinetid
        HostName openlab.ics.uci.edu`}</code>
          </pre>
          <p className="leading-relaxed">
            Swap <code>ucinetid</code> for your own ID, save, and now{" "}
            <code>ssh ics</code> should work :D
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Mounting Openlab in VS Code
          </h2>
          <p className="leading-relaxed">
            Once SSH works smoothly, you can use something like VS Code to
            directly access openlab:
          </p>
          <ol className="space-y-3 leading-relaxed">
            <li>
              Install the <em>Remote - SSH</em> extension (authored by
              Microsoft).
            </li>
            <li>
              Press
              <span className="inline-flex items-center gap-1 mx-1">
                <kbd className="kbd">⌘</kbd>
                <span>+</span>
                <kbd className="kbd">⇧</kbd>
                <span>+</span>
                <kbd className="kbd">P</kbd>
              </span>
              (macOS) or
              <span className="inline-flex items-center gap-1 mx-1">
                <kbd className="kbd">Ctrl</kbd>
                <span>+</span>
                <kbd className="kbd">Shift</kbd>
                <span>+</span>
                <kbd className="kbd">P</kbd>
              </span>
              (Windows) and run <code>Remote-SSH: Connect to Host</code>.
            </li>
            <li>
              Select the <code>ics</code> alias (or whichever host name you
              picked).
            </li>
            <li>
              VS Code may reopen in a fresh window and install server stuff the
              first time. If it fails, click <em>Retry</em>—it usually works on
              the second attempt.
            </li>
          </ol>
          <p className="leading-relaxed">
            From there, you get a full Explorer view of your Openlab files,
            integrated terminal, and the ability to run builds on the remote
            machine.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Troubleshooting + Expectations
          </h2>
          <ul className="space-y-3 leading-relaxed">
            <li>
              If a connection suddenly times out, it&apos;s probably the VPN.
              Reconnect or toggle between Split Tunnel / Full Tunnel modes.
            </li>
            <li>
              Use <code>ssh -v ics</code> for verbose logs when something feels
              off and it should point out permission issues or DNS typos.
            </li>
          </ul>
          <div className="alert alert-warning not-prose my-6">
            <span>
              Follow this at your own risk. It works great for me, but
              you&apos;re responsible for your environment. When asking staff
              for help, be prepared to reproduce issues on the official Hub.
            </span>
          </div>
        </section>
      </article>
    </motion.div>
  );
}
