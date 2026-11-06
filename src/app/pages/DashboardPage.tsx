import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { getSession, logout } from "../auth/auth";

type IconName =
  | "grid"
  | "trophy"
  | "clock"
  | "sparkle"
  | "medal"
  | "card"
  | "robot"
  | "bell"
  | "refresh"
  | "menu"
  | "close"
  | "user";

const iconPaths: Record<IconName, ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 21h8M9 17h6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  sparkle: (
    <path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Zm7 13 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
  ),
  medal: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m9 13-1 8 4-2 4 2-1-8" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.7-2 5.3-2 6 0M15 10h3M15 14h3" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M12 4v4M9 4h6M8 12h.01M16 12h.01M8 16h8M2 12h2M20 12h2" />
    </>
  ),
  bell: (
    <>
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 6v5h-5M4 18v-5h5" />
      <path d="M18.5 9A7 7 0 0 0 6.2 6.2L4 9m2 6a7 7 0 0 0 11.8 2.8L20 15" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
};

function Icon({ name, size = 19 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

const navigation: { label: string; icon: IconName; badge?: string }[] = [
  { label: "Overview", icon: "grid" },
  { label: "Events", icon: "trophy" },
  { label: "My Events", icon: "clock" },
  { label: "HackMate AI", icon: "sparkle" },
  { label: "IdeaCheck AI", icon: "sparkle" },
  { label: "Certificates", icon: "medal" },
  { label: "Digital Card", icon: "card" },
  { label: "RuleBot AI", icon: "robot", badge: "AI" },
  { label: "Student Guide", icon: "robot" },
  { label: "Official Communication", icon: "bell" },
  { label: "Notifications", icon: "bell" },
  { label: "Help & Support", icon: "robot" },
  { label: "Profile", icon: "user" },
];

function CampusLogo() {
  return (
    <div className="brand" aria-label="CampusCode Hackathon Arena">
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        <strong>CAMPUSCODE</strong>
        <small>HACKATHON ARENA</small>
      </span>
    </div>
  );
}

function BrandGlyph() {
  return (
    <span className="mini-brand" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  return (
    <div className={`avatar${small ? " avatar-small" : ""}`} aria-label={name}>
      <span className="hair" />
      <span className="face">
        <i className="eye eye-left" />
        <i className="eye eye-right" />
        <i className="nose" />
        <i className="smile" />
      </span>
      <span className="shirt" />
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  const openItem = (label: string) => {
    onClose();
    if (label === "Events") navigate("/events");
    if (label === "My Events") navigate("/my-events");
  };

  return (
    <>
      <div className={`sidebar-backdrop${open ? " visible" : ""}`} onClick={onClose} />
      <aside className={`sidebar${open ? " sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <CampusLogo />
          <button className="close-sidebar" onClick={onClose} aria-label="Close navigation">
            <Icon name="close" />
          </button>
        </div>
        <p className="nav-kicker">WORKSPACE</p>
        <nav aria-label="Student workspace">
          {navigation.map((item, index) => (
            <button
              className={`nav-item${index === 0 ? " active" : ""}`}
              key={item.label}
              onClick={() => openItem(item.label)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {index === 0 && <b>→</b>}
              {item.badge && <em>{item.badge}</em>}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

const stats = [
  ["REGISTERED", "0"],
  ["ONGOING", "0"],
  ["COMPLETED", "0"],
  ["CERTIFICATES", "0"],
];

function PanelHeader({ title, action }: { title: string; action: string }) {
  return (
    <div className="panel-header">
      <p>{title}</p>
      <button>{action} ↗</button>
    </div>
  );
}

function EmptyPanel({
  title,
  action,
  heading,
  description,
  shadow = false,
}: {
  title: string;
  action: string;
  heading: string;
  description: string;
  shadow?: boolean;
}) {
  return (
    <article className={`overview-panel empty-panel${shadow ? " elevated" : ""}`}>
      <PanelHeader title={title} action={action} />
      <div className="empty-panel-body">
        <BrandGlyph />
        <strong>{heading}</strong>
        <p>{description}</p>
      </div>
    </article>
  );
}

const events = [
  {
    title: "FirstCommit '26 Quiz Competition 2.0",
    accent: "event-lime",
  },
  {
    title: "FirstCommit '26 Quiz Competition",
    accent: "event-dark",
  },
];

const journey = [
  { label: "HACKATHONS", icon: "trophy" as IconName },
  { label: "ONGOING", icon: "sparkle" as IconName },
  { label: "COMPLETED", icon: "clock" as IconName },
  { label: "CERTIFICATES", icon: "medal" as IconName },
];

export default function App() {
  const navigate = useNavigate();
  const user = getSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  if (!user) return null;

  const firstName = user.name.trim().split(/\s+/)[0];
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div
      className="app-shell dashboard-page"
      onClickCapture={(event) => {
        const button = (event.target as HTMLElement).closest("button");
        if (
          !button ||
          button.classList.contains("refresh-button") ||
          button.classList.contains("auth-action")
        )
          return;
        const label = button.textContent?.replace(/\s+/g, " ").trim();
        if (label)
          setNotice(`${label} is a preview control until the CampusCode backend is connected.`);
      }}
    >
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="main">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Icon name="menu" />
          </button>
          <div className="breadcrumb">
            <span>CAMPUSCODE&nbsp; / &nbsp;STUDENT</span>
            <strong>PROFILE</strong>
          </div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Notifications">
              <Icon name="bell" size={17} />
              <span className="notification-dot" />
            </button>
            <button className="refresh-button" onClick={() => window.location.reload()}>
              <Icon name="refresh" size={17} />
              <span>REFRESH</span>
            </button>
            <div className="profile">
              <Avatar name={user.name} small />
              <span className="profile-copy">
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </span>
            </div>
            <button className="refresh-button auth-action" onClick={handleLogout}>
              <span>LOGOUT</span>
            </button>
          </div>
        </header>

        <section className="dashboard">
          <div className="welcome">
            <p className="eyebrow">STUDENT WORKSPACE / LIVE</p>
            <h1>
              WELCOME BACK, <span>{firstName.toUpperCase()}</span>.
            </h1>
            <p className="subtitle">
              Preview data is shown locally until a CampusCode backend is connected.
            </p>
          </div>

          <section className="assignment-card">
            <div className="assignment-copy">
              <p className="card-kicker">
                BUILD&nbsp;&nbsp;·&nbsp;&nbsp; LEARN&nbsp;&nbsp;·&nbsp;&nbsp; COLLABORATE
              </p>
              <div className="empty-mark" />
              <p className="empty-text">No current hackathon is assigned to your account.</p>
            </div>
            <Avatar name={user.name} />
          </section>

          <section className="stats-grid" aria-label="Student activity totals">
            {stats.map(([label, value]) => (
              <article className="stat-card" key={label}>
                <p>{label}</p>
                <strong>{value}</strong>
              </article>
            ))}
          </section>

          <section className="activity-grid">
            <EmptyPanel
              title="01 / CURRENT ACTIVITY"
              action="VIEW EVENTS"
              heading="NO CURRENT ACTIVITY"
              description="The backend has not returned a current hackathon for this student."
            />
            <EmptyPanel
              title="02 / NOTIFICATIONS"
              action="OPEN ALL"
              heading="ALL CAUGHT UP"
              description="No unread notifications."
              shadow
            />
          </section>

          <section className="overview-panel discover-panel">
            <PanelHeader title="03 / DISCOVER EVENTS" action="VIEW ALL" />
            <div className="events-grid">
              {events.map((event) => (
                <article className="event-card" key={event.title}>
                  <div className={`event-mark ${event.accent}`}>
                    <span>F</span>
                  </div>
                  <div className="event-copy">
                    <p>Open Innovation</p>
                    <strong>{event.title}</strong>
                    <small>–</small>
                  </div>
                  <button className="outline-action">JOIN NOW ↗</button>
                </article>
              ))}
            </div>
          </section>

          <section className="overview-bottom-grid">
            <article className="overview-panel deadline-panel">
              <PanelHeader title="UPCOMING DEADLINES" action="VIEW ALL" />
              <div className="deadline-body">
                <strong>No deadlines yet.</strong>
                <p>Join an event and your upcoming dates will appear here.</p>
                <button className="lime-action">BROWSE EVENTS ↗</button>
              </div>
            </article>

            <article className="overview-panel ai-panel">
              <p className="standalone-label">AI SPOTLIGHT</p>
              <h2>Your AI teammates are ready.</h2>
              <p className="ai-description">
                Check your idea, find teammates, or ask the rules — right from here.
              </p>
              <div className="ai-actions">
                <button>
                  <Icon name="sparkle" size={16} />
                  IDEACHECK
                </button>
                <button>
                  <Icon name="card" size={16} />
                  HACKMATE
                </button>
                <button>
                  <Icon name="robot" size={16} />
                  RULEBOT
                </button>
              </div>
            </article>

            <article className="overview-panel journey-panel">
              <PanelHeader title="YOUR JOURNEY" action="CERTIFICATES" />
              <div className="journey-list">
                {journey.map((item) => (
                  <div className="journey-row" key={item.label}>
                    <span className="journey-icon">
                      <Icon name={item.icon} size={17} />
                    </span>
                    <span className="journey-progress">
                      <i />
                      <small>{item.label}</small>
                    </span>
                    <strong>0</strong>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </section>
      </main>
      {notice && (
        <button
          className="dashboard-notice"
          onClick={() => setNotice("")}
          aria-label="Dismiss notice"
        >
          {notice}
        </button>
      )}
    </div>
  );
}
