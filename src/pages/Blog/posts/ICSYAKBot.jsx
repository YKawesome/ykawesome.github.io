import { motion } from "framer-motion";
import { images } from "../../../utils/preloadimages";

export default function ICSYAKBot() {
  const hero = images["icsyak.png"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-base-100"
    >
      {/* Hero Banner */}
      <div
        className="hero min-h-[40vh]"
        style={{ backgroundImage: hero ? `url(${hero})` : undefined }}
      >
        <div className="hero-overlay bg-opacity-70" />
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-3xl">
            <div className="flex flex-wrap justify-center mb-4 gap-3">
              <span className="badge badge-primary badge-outline">Discord</span>
              <span className="badge badge-secondary badge-outline">
                Automation
              </span>
              <span className="badge badge-accent badge-outline">EdTech</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Building ICSYAK
            </h1>
            <p className="mt-4 text-lg opacity-90">
              Unifying Ed Discussion, Piazza, and Gradescope into a single
              conversational hub inside Discord.
            </p>
            <div className="flex flex-wrap justify-center mt-6 text-sm gap-4 opacity-80">
              <span>Published: Feb 2025</span>
              <span>Reading time: ~7 min</span>
              <span>Development: Deployed & Maintained</span>
            </div>
          </div>
        </div>
      </div>
      {/* Article Body */}
      <article className="max-w-4xl px-4 py-12 mx-auto prose prose-invert sm:px-6 space-y-8">
        {/* Meta Panel */}
        <div className="my-6 not-prose grid gap-4 md:grid-cols-3">
          <div className="p-4 stat bg-base-200/30 rounded-xl">
            <div className="stat-title opacity-70">Threads Indexed</div>
            <div className="stat-value text-primary">1k+</div>
            <div className="stat-desc">Involving any category</div>
          </div>
          <div className="p-4 stat bg-base-200/30 rounded-xl">
            <div className="stat-title opacity-70">Students Assisted</div>
            <div className="stat-value text-secondary">1.5k+</div>
            <div className="stat-desc">Peak concurrency 600+</div>
          </div>
          <div className="p-4 stat bg-base-200/30 rounded-xl">
            <div className="stat-title opacity-70">Courses Utilized</div>
            <div className="stat-value text-accent">15+</div>
            <div className="stat-desc">Across 7 quarters</div>
          </div>
        </div>

        {/* Table of Contents */}
        <details className="border not-prose collapse collapse-arrow bg-base-200/40 border-base-300 rounded-xl">
          <summary className="font-semibold collapse-title">
            Table of Contents
          </summary>
          <div className="collapse-content">
            <ol className="text-sm list-decimal ps-5 space-y-1">
              <li>
                <a href="#problem" className="link link-hover">
                  Scattered Segments
                </a>
              </li>
              <li>
                <a href="#goals" className="link link-hover">
                  Constraints & Goals
                </a>
              </li>
              <li>
                <a href="#arch" className="link link-hover">
                  Architecture
                </a>
              </li>
              <li>
                <a href="#commands" className="link link-hover">
                  Command Design
                </a>
              </li>
              <li>
                <a href="#features" className="link link-hover">
                  Feature Modules
                </a>
              </li>
              <li>
                <a href="#hosting" className="link link-hover">
                  Hosting & Deployment
                </a>
              </li>
              <li>
                <a href="#stack" className="link link-hover">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#setup" className="link link-hover">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#directory" className="link link-hover">
                  Directory Overview
                </a>
              </li>
              <li>
                <a href="#lessons" className="link link-hover">
                  Lessons Learned
                </a>
              </li>
            </ol>
          </div>
        </details>

        <h2
          id="problem"
          className="mt-10 mb-3 text-2xl font-semibold tracking-tight"
        >
          1. Scattered Segments
        </h2>
        <p className="leading-relaxed">
          <strong>Ed Discussion</strong> and <strong>Piazza</strong> were the{" "}
          <em>official</em> course forums for a lot of my classes, and Discord
          was the unofficial, student‑run space (that I happened to really like
          making). The problem wasn’t that the official tools lacked features,
          it was that a large chunk of students just didn’t open them often.
          Answers, clarifications, and deadline adjustments would happen and no
          one would notice, or worse, there&apos;d be accidental misinformation
          and people would start freaking out (and then I'd have to deal with
          that).
        </p>
        <div className="my-4 alert alert-info not-prose">
          <span>
            Observation: Students would often re-ask questions already answered
            on a different platform within the same hour.
          </span>
        </div>
        <p className="leading-relaxed">
          Bringing threads into Discord collapsed the gap between “official
          record” and “where people actually look,” making previously missed
          information immediately more accessible.
        </p>

        <h2
          id="goals"
          className="mt-10 mb-3 text-2xl font-semibold tracking-tight"
        >
          2. Constraints & Goals
        </h2>
        <div className="mt-2 not-prose">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col h-full p-4 border card bg-base-200/30 border-base-300/40 rounded-xl">
              <h4 className="mb-1 text-sm font-semibold tracking-wide uppercase opacity-70">
                Zero Friction
              </h4>
              <p className="text-sm opacity-85">
                One short slash command or passive glance—no multi‑step
                navigation.
              </p>
            </div>
            <div className="flex flex-col h-full p-4 border card bg-base-200/30 border-base-300/40 rounded-xl">
              <h4 className="mb-1 text-sm font-semibold tracking-wide uppercase opacity-70">
                Opt‑In Delivery
              </h4>
              <p className="text-sm opacity-85">
                <code>@EdPings</code> role via native onboarding; only people
                who chose it get notified.
              </p>
            </div>
            <div className="flex flex-col h-full p-4 border card bg-base-200/30 border-base-300/40 rounded-xl">
              <h4 className="mb-1 text-sm font-semibold tracking-wide uppercase opacity-70">
                No Spam
              </h4>
              <p className="text-sm opacity-85">
                Debounced + filtered; minor edits don’t cascade into repost
                storms.
              </p>
            </div>
            <div className="flex flex-col h-full p-4 border card bg-base-200/30 border-base-300/40 rounded-xl">
              <h4 className="mb-1 text-sm font-semibold tracking-wide uppercase opacity-70">
                Scoped Ingestion
              </h4>
              <p className="text-sm opacity-85">
                Started all categories → shifted to pinned‑only; kept category
                code path for future courses.
              </p>
            </div>
            <div className="flex flex-col h-full p-4 border card bg-base-200/30 border-base-300/40 rounded-xl">
              <h4 className="mb-1 text-sm font-semibold tracking-wide uppercase opacity-70">
                Resilient
              </h4>
              <p className="text-sm opacity-85">
                Backoff, snapshot cache & queue hide upstream flakiness.
              </p>
            </div>
            <div className="flex flex-col h-full p-4 border card bg-base-200/30 border-base-300/40 rounded-xl">
              <h4 className="mb-1 text-sm font-semibold tracking-wide uppercase opacity-70">
                Auditable
              </h4>
              <p className="text-sm opacity-85">
                Deterministic formatting + logs answer &ldquo;who saw what
                when&rdquo;.
              </p>
            </div>
            <div className="flex flex-col h-full p-4 border card bg-base-200/30 border-base-300/40 rounded-xl sm:col-span-2 lg:col-span-3">
              <h4 className="mb-1 text-sm font-semibold tracking-wide uppercase opacity-70">
                Evolvable
              </h4>
              <p className="text-sm opacity-85">
                Composable modules (role gating, category filter, pin filter)
                added incrementally as I discovered Discord API features.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-center opacity-80">
            A pattern developed where I&apos;d notice friction, learn a new
            discord.py feature, and add something new :)
          </p>
        </div>

        <h2
          id="arch"
          className="mt-10 mb-3 text-2xl font-semibold tracking-tight"
        >
          3. Architecture
        </h2>

        <p className="leading-relaxed">
          I kept everything in <strong>discord.py</strong> instead of using
          discord.js because I had zero JavaScript experience at the time, but I
          had already shipped a small Python bot in high school and genuinely
          liked the language. Sticking with the Python ecosystem meant I could
          move faster and debug without feeling lost in a new stack.
        </p>
        <p className="leading-relaxed">
          Around the same time I was taking <strong>ICS32A</strong> and{" "}
          <strong>ICS33</strong>, which dove into intermediate Python features
          like decorators. That accidentally unlocked a lot of understanding for
          the bot—suddenly
          <code>@bot.command()</code> and <code>@tasks.loop()</code> weren’t
          enchantment table language, I knew they were just functions wrapping
          other functions (and kind of formatting my command for Discord).
        </p>
        <p className="leading-relaxed">
          Operationally, every class gets its own scheduled task that wakes up
          every 30 minutes. The loop grabs the newest threads from Ed and
          Piazza, normalizes them into a shared shape, then compares the IDs
          against what the Discord channel has already seen.
        </p>
        <pre className="my-3 text-xs leading-snug mockup-code">
          <code>{`  class THREADGRABBER(commands.Cog):
        def __init__(self, bot):
            self.bot = bot
            self.get_6b_pinned.start()

        @tasks.loop(minutes=30)
        async def get_6b_pinned(self):
            await self.do_ed_message(course_id=____, channel_id=____,
                                    role_id=_____, category="Pinned")

        async def do_ed_message(self, course_id, channel_id, role_id, category=None):
            channel = await self.bot.fetch_channel(channel_id)
            seen = {int(m.embeds[0].footer.text.split("|")[-1])
                    for m in [message async for message in channel.history(limit=100)]
                    if m.embeds and m.embeds[0].footer}
            threads = sorted(ed.get_threads(6, course_id), key=ed.get_date)
            for thread in threads:
                if ed.get_id(thread) in seen:
                    continue
                embed = ed.make_embed(thread, 0x50288C)
                msg = await channel.send(embed=embed)
                await msg.add_reaction("❤️")
                await channel.send(f"<@&{role_id}>")`}</code>
        </pre>
        <p className="leading-relaxed">
          The <code>seen</code> set pulled from the last 100 messages is the
          lightweight guard against duplicate storms—if a thread ID has already
          been announced, the loop simply skips it on the next poll. Each class
          runs the same pattern with a different course ID, channel, and role
          tag, which keeps the Cog composable as enrollment shifts.
        </p>

        <div className="my-4 alert alert-warning not-prose">
          <span>
            Limitation: Ed Discussion API occasionally redacts comment authors,
            so I either anonymize (&quot;anonymous&quot;) or omit the line. The
            data model keeps the author optional.
          </span>
        </div>
      </article>
    </motion.div>
  );
}
