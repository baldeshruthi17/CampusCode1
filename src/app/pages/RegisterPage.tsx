import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../auth/auth";

const benefits = [
  {
    number: "01",
    category: "IDENTITY",
    title: "CREATE",
    description: "Build your student profile and enter the CampusCode ecosystem.",
    featured: true,
  },
  {
    number: "02",
    category: "TEAM",
    title: "COLLABORATE",
    description: "Find teammates and build projects together.",
  },
  {
    number: "03",
    category: "ARENA",
    title: "COMPETE",
    description: "Join hackathons and turn ideas into submissions.",
  },
];

type FieldProps = {
  label: string;
  name: string;
  icon?: ReactNode;
  placeholder: string;
  type?: string;
  action?: boolean;
  autoComplete?: string;
  required?: boolean;
};

function Field({
  label,
  name,
  icon,
  placeholder,
  type = "text",
  action = false,
  autoComplete,
  required = true,
}: FieldProps) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-shell">
        {icon && <span className="field-icon">{icon}</span>}
        <input
          id={id}
          name={name}
          type={type === "password" && revealed ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
        />
        {action && (
          <button
            className="show-password"
            type="button"
            onClick={() => setRevealed((value) => !value)}
            aria-label={`${revealed ? "Hide" : "Show"} ${label.toLowerCase()}`}
          >
            <span aria-hidden="true">○</span>
            {revealed ? "HIDE" : "SHOW"}
          </button>
        )}
      </div>
    </div>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand-mark brand-mark--compact" : "brand-mark"} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function AppHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="CampusCode home">
        <BrandMark />
        <span className="brand-copy">
          <strong>CAMPUSCODE</strong>
          <small>HACKATHON ARENA</small>
        </span>
      </Link>
      <Link className="back-link" to="/">
        ← BACK TO HOME
      </Link>
    </header>
  );
}

function IntroSection() {
  return (
    <section className="intro" aria-labelledby="registration-title">
      <div className="eyebrow">
        <span className="live-dot" />
        CAMPUSCODE / REGISTRATION
      </div>
      <div className="section-index">
        <span>CREATE</span>
        <span>02 / 02</span>
      </div>

      <h1 id="registration-title" className="hero-title">
        <span>JOIN</span>
        <span>THE</span>
        <span className="outlined">ARENA.</span>
      </h1>

      <p className="intro-copy">
        Create your CampusCode identity and become part of a student ecosystem designed around
        ideas, teams, technology and competition.
      </p>

      <div className="benefits" aria-label="CampusCode benefits">
        {benefits.map((benefit) => (
          <article
            className={`benefit ${benefit.featured ? "benefit--featured" : ""}`}
            key={benefit.number}
          >
            <div className="benefit-meta">
              <span>{benefit.number}</span>
              <span>{benefit.category}</span>
            </div>
            <h2>{benefit.title}</h2>
            <p>{benefit.description}</p>
            {benefit.featured && (
              <span className="benefit-progress" aria-hidden="true">
                <i />
              </span>
            )}
          </article>
        ))}
      </div>

      <div className="intro-status">
        <span>
          <i /> REGISTRATION OPEN
        </span>
        <span>STUDENT INNOVATION NETWORK</span>
        <span>2026</span>
      </div>
    </section>
  );
}

function RegistrationForm() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("SECURE REGISTRATION");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (!name || !email || !password || !confirmPassword || !accepted) {
      setError("Please complete all required fields.");
      setStatus("REGISTRATION NEEDS ATTENTION");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setStatus("REGISTRATION NEEDS ATTENTION");
      return;
    }

    const result = register({ name, email, password, role: "Student" });
    if (!result.ok) {
      setError(result.error);
      setStatus("REGISTRATION NEEDS ATTENTION");
      return;
    }

    setSubmitted(true);
    setStatus("ACCOUNT CREATED / REDIRECTING TO LOGIN");
    navigate("/login", { state: { registeredEmail: result.user.email } });
  };

  return (
    <section className="form-column" aria-labelledby="register-heading">
      <form className="registration-card" onSubmit={submit}>
        <div className="card-accent" />
        <div className="form-heading">
          <div>
            <span className="form-kicker">NEW ACCOUNT</span>
            <h2 id="register-heading">REGISTER</h2>
            <p>Create your CampusCode account.</p>
          </div>
          <span className="card-index">
            CC
            <br />
            02
          </span>
        </div>

        <div className="form-fields">
          <Field
            label="FULL NAME"
            name="name"
            icon="◇"
            placeholder="Your full name"
            autoComplete="name"
          />
          <Field
            label="EMAIL ADDRESS"
            name="email"
            icon="@"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
          />

          <div className="field account-field">
            <label htmlFor="account-type">ACCOUNT TYPE</label>
            <div className="input-shell">
              <span className="field-icon cap-icon" aria-hidden="true">
                ⌂
              </span>
              <select id="account-type" defaultValue="Student">
                <option>Student</option>
              </select>
            </div>
            <p className="organizer-note">
              Organizer? Accounts are created by our team — contact{" "}
              <a href="mailto:campuscode@gmail.com">campuscode@gmail.com</a>
            </p>
          </div>

          <Field
            label="PASSWORD"
            name="password"
            icon="•"
            placeholder="Create a password"
            type="password"
            action
            autoComplete="new-password"
          />
          <Field
            label="CONFIRM PASSWORD"
            name="confirmPassword"
            icon="•"
            placeholder="Repeat your password"
            type="password"
            action
            autoComplete="new-password"
          />

          <div className="field captcha-field">
            <label htmlFor="captcha">CAPTCHA</label>
            <div className="captcha-row">
              <img
                src="/campuscode/register/934cc.svg"
                alt="Captcha code 77570"
                width="150"
                height="50"
              />
              <button
                type="button"
                onClick={() => setStatus("NEW CAPTCHA REQUIRES A CAPTCHA SERVICE")}
              >
                ↻ NEW
              </button>
            </div>
            <div className="input-shell captcha-input">
              <input
                id="captcha"
                placeholder="Enter the code above"
                inputMode="numeric"
                pattern="77570"
                title="Enter 77570"
                required
              />
            </div>
          </div>

          <label className="confirm-row">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              required
            />
            <span className="custom-checkbox" aria-hidden="true">
              {accepted ? "✓" : ""}
            </span>
            <span>
              I confirm that I am <strong>18 years of age or older</strong>.
            </span>
          </label>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button className="submit-button" type="submit" aria-disabled={!accepted}>
            <span className="button-logo">
              <BrandMark compact />
            </span>
            <strong>{submitted ? "ACCOUNT CREATED" : "CREATE STUDENT ACCOUNT"}</strong>
            <span className="submit-arrow">↗</span>
          </button>
        </div>

        <div className="login-row">
          <span>ALREADY HAVE AN ACCOUNT?</span>
          <button type="button" onClick={() => navigate("/login")}>
            LOGIN →
          </button>
        </div>
      </form>

      <div className="form-status">
        <span>AUTH / 2026</span>
        <span>
          <i /> {status}
        </span>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="page-shell register-page">
      <div className="ambient ambient--purple" />
      <div className="ambient ambient--green" />
      <img className="network-lines" src="/campuscode/register/79fd1.svg" alt="" />
      <AppHeader />
      <main>
        <IntroSection />
        <RegistrationForm />
      </main>
      <footer className="site-footer">
        <span>CAMPUSCODE © 2026</span>
        <span>LEARN · BUILD · COMPETE · SHIP</span>
        <span>ALL SYSTEMS OPERATIONAL</span>
      </footer>
    </div>
  );
}
