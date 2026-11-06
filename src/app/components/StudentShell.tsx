import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { logout, type AuthUser } from "../auth/auth";

export type IconName =
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

export function Icon({ name, size = 19 }: { name: IconName; size?: number }) {
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

const navigation: { label: string; icon: IconName; path: string; badge?: string }[] = [
  { label: "Overview", icon: "grid", path: "/dashboard" },
  { label: "Events", icon: "trophy", path: "/events" },
  { label: "My Events", icon: "clock", path: "/my-events" },
  { label: "HackMate AI", icon: "sparkle", path: "/dashboard" },
  { label: "IdeaCheck AI", icon: "sparkle", path: "/dashboard" },
  { label: "Certificates", icon: "medal", path: "/dashboard" },
  { label: "Digital Card", icon: "card", path: "/dashboard" },
  { label: "RuleBot AI", icon: "robot", path: "/dashboard", badge: "AI" },
  { label: "Student Guide", icon: "robot", path: "/dashboard" },
  { label: "Official Communication", icon: "bell", path: "/dashboard" },
  { label: "Notifications", icon: "bell", path: "/dashboard" },
  { label: "Help & Support", icon: "robot", path: "/dashboard" },
  { label: "Profile", icon: "user", path: "/dashboard" },
];

const figmaEventsNavigation: {
  label: string;
  asset: string;
  path: string;
}[] = [
  { label: "Overview", asset: "7cf0c.svg", path: "/dashboard" },
  { label: "Events", asset: "df139.svg", path: "/events" },
  { label: "Notifications", asset: "f6dba.svg", path: "/dashboard" },
  { label: "Help & Support", asset: "4cc04.svg", path: "/dashboard" },
  { label: "Profile", asset: "2c4ee.svg", path: "/dashboard" },
  { label: "My Events", asset: "2f478.svg", path: "/my-events" },
  { label: "HackMate AI", asset: "75f68.svg", path: "/dashboard" },
  { label: "IdeaCheck AI", asset: "75f68.svg", path: "/dashboard" },
  { label: "Certificates", asset: "3409d.svg", path: "/dashboard" },
  { label: "Digital Card", asset: "64d0e.svg", path: "/dashboard" },
  { label: "RuleBot AI", asset: "e4942.svg", path: "/dashboard" },
  { label: "Student Guide", asset: "7b1cd.svg", path: "/dashboard" },
  { label: "Official Communication", asset: "f6dba.svg", path: "/dashboard" },
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

export function Avatar({ name, small = false }: { name: string; small?: boolean }) {
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

function Sidebar({
  activeLabel,
  open,
  onClose,
  user,
  designVariant,
}: {
  activeLabel: string;
  open: boolean;
  onClose: () => void;
  user: AuthUser;
  designVariant?: "events";
}) {
  const navigate = useNavigate();
  const initials = user.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const items = designVariant === "events" ? figmaEventsNavigation : navigation;

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
          {items.map((item) => {
            const active = item.label === activeLabel;
            return (
              <button
                className={`nav-item${active ? " active" : ""}`}
                key={item.label}
                onClick={() => {
                  onClose();
                  navigate(item.path);
                }}
              >
                {"asset" in item ? (
                  <span className="figma-nav-icon">
                    <img src={`/assets/${item.asset}`} alt="" />
                  </span>
                ) : (
                  <Icon name={item.icon} />
                )}
                <span>{item.label}</span>
                {active && <b>→</b>}
                {"badge" in item && item.badge && <em>{item.badge}</em>}
              </button>
            );
          })}
        </nav>
        {designVariant === "events" && (
          <div className="figma-sidebar-account">
            <p>ACCOUNT</p>
            <div>
              <span>{initials}</span>
              <p>
                <strong>{user.name}</strong>
                <small>STUDENT</small>
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
            >
              ↪&nbsp;&nbsp; LOG OUT
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default function StudentShell({
  user,
  activeLabel,
  pageLabel,
  children,
  designVariant,
}: {
  user: AuthUser;
  activeLabel: string;
  pageLabel: string;
  children: ReactNode;
  designVariant?: "events";
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={`app-shell dashboard-page${designVariant === "events" ? " figma-events-shell" : ""}`}
    >
      <Sidebar
        activeLabel={activeLabel}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        designVariant={designVariant}
      />
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
            <strong>{pageLabel}</strong>
          </div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Notifications">
              {designVariant === "events" ? (
                <img src="/assets/93bbd.svg" alt="" />
              ) : (
                <Icon name="bell" size={17} />
              )}
              <span className="notification-dot">{designVariant === "events" ? "2" : ""}</span>
            </button>
            <button className="refresh-button" onClick={() => window.location.reload()}>
              {designVariant === "events" ? (
                <span className="figma-refresh-icon">
                  <img src="/assets/a6a40.svg" alt="" />
                </span>
              ) : (
                <Icon name="refresh" size={17} />
              )}
              <span>REFRESH</span>
            </button>
            <div className="profile">
              {designVariant === "events" ? (
                <span className="figma-profile-avatar">
                  <img src="/assets/1b52e.svg" alt="" />
                </span>
              ) : (
                <Avatar name={user.name} small />
              )}
              <span className="profile-copy">
                <strong>{user.name}</strong>
                {designVariant !== "events" && <small>{user.email}</small>}
              </span>
            </div>
            {designVariant !== "events" && (
              <button className="refresh-button auth-action" onClick={handleLogout}>
                <span>LOGOUT</span>
              </button>
            )}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
