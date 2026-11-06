import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const steps = [
  ["01", "DISCOVER", "Find a challenge that makes you want to build."],
  ["02", "TEAM UP", "Find people who share your ambition."],
  ["03", "BUILD", "Turn your idea into something people can use."],
  ["04", "SHIP", "Submit your work and take it to the arena."],
];

const arenas = [
  {
    number: "01",
    category: "ARTIFICIAL INTELLIGENCE",
    title: "AI INNOVATION",
    description: "Build intelligent solutions for problems that matter.",
    status: "LIVE",
    live: true,
  },
  {
    number: "02",
    category: "WEB DEVELOPMENT",
    title: "FUTURE WEB",
    description: "Design and ship the next generation of digital experiences.",
    status: "OPEN",
  },
  {
    number: "03",
    category: "SMART TECHNOLOGY",
    title: "CAMPUS TECH",
    description: "Create technology that makes student life better.",
    status: "UPCOMING",
  },
];

const ticker = ["IDEAS", "PEOPLE", "PRODUCTS", "INNOVATION", "COMMUNITY"];

const heroBubbles = [
  {
    x: 5,
    y: 70,
    size: 7,
    duration: 18,
    delay: -7,
    color: "purple",
    opacity: 0.34,
    x1: 28,
    y1: -32,
    x2: -14,
    y2: 18,
  },
  {
    x: 12,
    y: 32,
    size: 12,
    duration: 24,
    delay: -16,
    color: "blue",
    opacity: 0.2,
    x1: -22,
    y1: 25,
    x2: 36,
    y2: -14,
  },
  {
    x: 24,
    y: 78,
    size: 5,
    duration: 16,
    delay: -4,
    color: "lime",
    opacity: 0.46,
    x1: 20,
    y1: 16,
    x2: -30,
    y2: -28,
  },
  {
    x: 34,
    y: 15,
    size: 8,
    duration: 22,
    delay: -12,
    color: "purple",
    opacity: 0.26,
    x1: -35,
    y1: 22,
    x2: 18,
    y2: 34,
  },
  {
    x: 46,
    y: 88,
    size: 15,
    duration: 28,
    delay: -19,
    color: "lime",
    opacity: 0.16,
    x1: 42,
    y1: -34,
    x2: -20,
    y2: -12,
  },
  {
    x: 55,
    y: 24,
    size: 6,
    duration: 17,
    delay: -9,
    color: "blue",
    opacity: 0.34,
    x1: 24,
    y1: 30,
    x2: -18,
    y2: -24,
  },
  {
    x: 66,
    y: 69,
    size: 10,
    duration: 23,
    delay: -3,
    color: "purple",
    opacity: 0.3,
    x1: -28,
    y1: -38,
    x2: 34,
    y2: 10,
  },
  {
    x: 73,
    y: 12,
    size: 5,
    duration: 19,
    delay: -11,
    color: "lime",
    opacity: 0.44,
    x1: 18,
    y1: 28,
    x2: -26,
    y2: 14,
  },
  {
    x: 81,
    y: 55,
    size: 13,
    duration: 27,
    delay: -20,
    color: "blue",
    opacity: 0.18,
    x1: -38,
    y1: 18,
    x2: 20,
    y2: -36,
  },
  {
    x: 91,
    y: 25,
    size: 7,
    duration: 21,
    delay: -14,
    color: "purple",
    opacity: 0.38,
    x1: 24,
    y1: -18,
    x2: -32,
    y2: 30,
  },
  {
    x: 96,
    y: 74,
    size: 4,
    duration: 15,
    delay: -6,
    color: "lime",
    opacity: 0.5,
    x1: -16,
    y1: -24,
    x2: 12,
    y2: 18,
  },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand--footer" : ""}`}
      href="#top"
      aria-label="CampusCode home"
    >
      {!footer && (
        <>
          <img
            className="brand-border brand-border--top"
            src="/campuscode/landing/f971a.svg"
            alt=""
          />
          <img
            className="brand-border brand-border--right"
            src="/campuscode/landing/5f3fd.svg"
            alt=""
          />
          <img
            className="brand-border brand-border--bottom"
            src="/campuscode/landing/a4364.svg"
            alt=""
          />
          <img
            className="brand-border brand-border--left"
            src="/campuscode/landing/eee9a.svg"
            alt=""
          />
        </>
      )}
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="brand-copy">
        <strong>CAMPUSCODE</strong>
        <small>HACKATHON ARENA</small>
      </span>
    </a>
  );
}

function JoinDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="join-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="dialog-close" onClick={onClose} aria-label="Close join dialog">
          ×
        </button>
        <p className="eyebrow">
          <span /> APPLICATIONS OPEN
        </p>
        <h2 id="join-title">
          BUILD YOUR
          <br />
          NEXT IDEA.
        </h2>
        <p>Join the CampusCode builder network and be first to hear about new hackathons.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <label>
            <span>EMAIL ADDRESS</span>
            <input type="email" placeholder="you@university.edu" required autoFocus />
          </label>
          <button className="button button--dark" type="submit">
            REQUEST ACCESS <span>↗</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [storyPlaying, setStoryPlaying] = useState(false);
  const [activeArena, setActiveArena] = useState<number | null>(0);
  const [joinOpen, setJoinOpen] = useState(false);
  const storyVideoRef = useRef<HTMLVideoElement>(null);

  const join = () => {
    setMenuOpen(false);
    navigate("/register");
  };

  const toggleStory = async () => {
    const video = storyVideoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
      } catch {
        setStoryPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <main
      id="top"
      className="campus-landing landing-page"
      onPointerMove={(event) => {
        event.currentTarget.style.setProperty("--cursor-x", `${event.clientX}px`);
        event.currentTarget.style.setProperty("--cursor-y", `${event.clientY}px`);
      }}
    >
      <span className="landing-cursor" aria-hidden="true" />
      <header className="site-header">
        <Brand />
        <nav
          className={menuOpen ? "main-nav main-nav--open" : "main-nav"}
          aria-label="Main navigation"
        >
          <a href="#about" onClick={() => setMenuOpen(false)}>
            ABOUT
          </a>
          <a href="#how" onClick={() => setMenuOpen(false)}>
            HOW IT WORKS
          </a>
          <a href="#hackathons" onClick={() => setMenuOpen(false)}>
            HACKATHONS
          </a>
          <a href="#community" onClick={() => setMenuOpen(false)}>
            COMMUNITY
          </a>
        </nav>
        <div className="header-actions">
          <button className="login-link" onClick={() => navigate("/login")}>
            LOGIN
          </button>
          <button className="button button--outline" onClick={join}>
            JOIN CAMPUSCODE <span>↗</span>
          </button>
          <button
            className={menuOpen ? "menu-toggle menu-toggle--open" : "menu-toggle"}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-grid" src="/campuscode/landing/58af9.svg" alt="" />
        <div className="hero-ambient" aria-hidden="true">
          <i className="hero-glow hero-glow--purple" />
          <i className="hero-glow hero-glow--lime" />
          <i className="hero-glow hero-glow--blue" />
        </div>
        <div className="hero-network" aria-hidden="true">
          <svg viewBox="0 0 1400 800" preserveAspectRatio="none">
            <path d="M0 600 C180 450 250 620 420 430 S680 80 900 270 S1150 500 1400 180" />
            <path d="M80 130 C280 300 380 80 570 270 S800 620 1080 500 S1250 400 1400 620" />
            <path d="M250 800 C400 600 570 650 720 460 S970 180 1160 80" />
            <circle cx="420" cy="430" r="5" />
            <circle cx="900" cy="270" r="5" />
            <circle cx="1080" cy="500" r="5" />
            <circle cx="570" cy="270" r="5" />
            <circle cx="1160" cy="80" r="5" />
          </svg>
        </div>
        <div className="hero-bubbles" aria-hidden="true">
          {heroBubbles.map((bubble, index) => (
            <i
              className={`hero-bubble hero-bubble--${bubble.color} ${index % 3 === 0 ? "hero-bubble--fade" : ""}`}
              key={`${bubble.x}-${bubble.y}`}
              style={
                {
                  "--bubble-x": `${bubble.x}%`,
                  "--bubble-y": `${bubble.y}%`,
                  "--bubble-size": `${bubble.size}px`,
                  "--bubble-duration": `${bubble.duration}s`,
                  "--bubble-delay": `${bubble.delay}s`,
                  "--bubble-opacity": bubble.opacity,
                  "--bubble-opacity-soft": bubble.opacity * 0.65,
                  "--bubble-opacity-mid": bubble.opacity * 0.8,
                  "--bubble-x1": `${bubble.x1}px`,
                  "--bubble-y1": `${bubble.y1}px`,
                  "--bubble-x2": `${bubble.x2}px`,
                  "--bubble-y2": `${bubble.y2}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="hero-meta">
          <span>
            <i /> THE DIGITAL HOME FOR STUDENT INNOVATION
          </span>
          <span>CHENNAI · INDIA</span>
        </div>
        <div className="hero-content">
          <p className="section-code">CAMPUSCODE / 001</p>
          <h1 id="hero-title">
            BUILD
            <br />
            <span>COMPETE</span>
            <br />
            SHIP.
          </h1>
          <div className="hero-bottom">
            <p>
              A digital arena for students
              <br />
              who don't just have ideas.
              <br />
              They build them.
            </p>
            <a className="button button--light" href="#hackathons">
              EXPLORE HACKATHONS <span>↗</span>
            </a>
          </div>
        </div>
        <div className="hero-scroll">
          <a href="#about">SCROLL TO EXPLORE</a>
          <span className="progress">
            <i />
          </span>
          <span>01 / 05</span>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          {[...ticker, ...ticker, ...ticker].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <b>✦</b>
            </span>
          ))}
        </div>
      </div>

      <section className="about section" id="about">
        <span className="section-number">01</span>
        <div className="about-copy">
          <p className="eyebrow">
            <span /> WHAT IS CAMPUSCODE?
          </p>
          <h2>
            WHERE
            <br />
            STUDENTS
            <br />
            <span>BUILD.</span>
          </h2>
          <p className="body-copy">
            CampusCode brings students, teams, organizers and hackathons into one connected
            ecosystem.
          </p>
        </div>
        <div className="orbit" aria-label="CampusCode connected ecosystem">
          <span className="orbit-ring orbit-ring--one" />
          <span className="orbit-ring orbit-ring--two" />
          <span className="orbit-ring orbit-ring--three" />
          <small className="orbit-label orbit-label--one">01</small>
          <small className="orbit-label orbit-label--two">02</small>
          <small className="orbit-label orbit-label--three">03</small>
          <strong>CC</strong>
        </div>
      </section>

      <section className="experience section" aria-labelledby="experience-title">
        <div className="section-topline">
          <span>02 — EXPERIENCE</span>
          <span>00:30</span>
        </div>
        <p className="section-kicker">THE CAMPUSCODE EXPERIENCE</p>
        <h2 id="experience-title">
          BUILD
          <br />
          TOGETHER.
        </h2>
        <button
          className={storyPlaying ? "story story--playing" : "story"}
          onClick={toggleStory}
          aria-label={storyPlaying ? "Pause CampusCode story" : "Play CampusCode story"}
        >
          <video
            ref={storyVideoRef}
            className="story-video"
            src="/campuscode/landing/campuscode-story.mp4"
            preload="auto"
            playsInline
            onPlay={() => setStoryPlaying(true)}
            onPause={() => setStoryPlaying(false)}
            onEnded={(event) => {
              event.currentTarget.currentTime = 0;
              setStoryPlaying(false);
            }}
          />
          <span className="story-glow" />
          <span className="play-button">{storyPlaying ? "Ⅱ" : "▶"}</span>
          <span className="story-label">{storyPlaying ? "PLAYING STORY" : "TAP TO PLAY"}</span>
          {storyPlaying && <span className="story-progress" />}
        </button>
        <div className="section-bottomline">
          <span>WATCH THE STORY</span>
          <span>PLAYS AS YOU SCROLL ↗</span>
        </div>
      </section>

      <section className="process section" id="how">
        <div className="section-heading">
          <h2>
            <span>03</span> HOW IT WORKS
          </h2>
          <p>
            FROM IDEA
            <br />
            TO IMPACT.
          </p>
        </div>
        <div className="step-grid">
          {steps.map(([number, title, description]) => (
            <a className="step-card" href="#hackathons" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <b>↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="arena section" id="hackathons">
        <div className="section-heading">
          <h2>
            <span>04</span> ENTER THE ARENA
          </h2>
          <a href="#hackathons">VIEW ALL ↗</a>
        </div>
        <div className="arena-list">
          {arenas.map((item, index) => (
            <button
              className={activeArena === index ? "arena-row arena-row--active" : "arena-row"}
              key={item.title}
              onClick={() => setActiveArena(activeArena === index ? null : index)}
              aria-expanded={activeArena === index}
            >
              <span className="arena-number">{item.number}</span>
              <span className="arena-title">
                <small>{item.category}</small>
                <strong>{item.title}</strong>
              </span>
              <span className="arena-description">{item.description}</span>
              <span className={item.live ? "arena-status arena-status--live" : "arena-status"}>
                <i /> {item.status}
              </span>
              <span className="arena-arrow">{activeArena === index ? "↓" : "↗"}</span>
              {activeArena === index && (
                <span className="arena-detail">
                  Teams of 2–5 · Student builders · Registration is free
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="mission section">
        <div className="mission-watermark">CAMPUSCODE</div>
        <div>
          <p className="section-code">05 — THE MISSION</p>
          <h2>
            GREAT
            <br />
            IDEAS
            <br />
            <span>NEED BUILDERS.</span>
          </h2>
          <p className="body-copy">
            Your university is full of people with ideas. CampusCode gives those ideas somewhere to
            go.
          </p>
        </div>
      </section>

      <section className="community section" id="community">
        <div className="community-copy">
          <p className="section-kicker">THE NETWORK</p>
          <h2>
            FIND
            <br />
            YOUR
            <br />
            <span>PEOPLE.</span>
          </h2>
        </div>
        <div className="network">
          <span className="network-ring" />
          {[0, 1, 2, 3, 4].map((point) => (
            <i key={point} style={{ "--point": point } as React.CSSProperties} />
          ))}
          <strong>CC</strong>
          <p>
            Build with developers.
            <br />
            Think with designers.
            <br />
            Compete with builders.
          </p>
        </div>
      </section>

      <section className="final-cta section">
        <span className="cta-ring" />
        <div>
          <p className="section-code">READY?</p>
          <h2>
            YOUR NEXT
            <br />
            <span>PROJECT</span>
            <br />
            STARTS HERE.
          </h2>
          <button className="button button--dark" onClick={join}>
            JOIN CAMPUSCODE <span>↗</span>
          </button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-intro">
            <Brand footer />
            <p>
              The student hackathon arena.
              <br />
              You build the idea,
              <br />
              we run the competition.
            </p>
          </div>
          <div>
            <h3>PRODUCT</h3>
            <a href="#about">About</a>
            <a href="#hackathons">Hackathons</a>
            <a href="#how">How it works</a>
            <a href="#community">Community</a>
          </div>
          <div>
            <h3>BUILDERS</h3>
            <a href="#community">Students</a>
            <a href="#community">Teams</a>
            <a href="#community">Organizers</a>
            <a href="#community">Developers</a>
          </div>
          <div>
            <h3>GUIDES</h3>
            <a href="#hackathons">Hackathon Rules</a>
            <a href="#top">FAQ</a>
            <a href="#top">Support</a>
            <a href="#top">Contact</a>
          </div>
        </div>
        <div className="footer-status">
          <span>
            <i /> ALL SYSTEMS OPERATIONAL
          </span>
          <a href="#top">TERMS</a>
          <a href="#top">PRIVACY</a>
          <a href="#top">CONTACT</a>
        </div>
        <div className="footer-wordmark">CampusCode</div>
        <div className="footer-legal">
          <span>© 2026 CAMPUSCODE</span>
          <span>LEARN · BUILD · COMPETE · SHIP</span>
          <span>CHENNAI · INDIA</span>
        </div>
      </footer>

      <JoinDialog open={joinOpen} onClose={() => setJoinOpen(false)} />
    </main>
  );
}
