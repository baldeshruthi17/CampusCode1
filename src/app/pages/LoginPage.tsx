import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { login } from "../auth/auth";

const DEMO_EMAIL = "shruthi@campuscode.com";
const DEMO_PASSWORD = "Shruthi@123";

function useLoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const registeredEmail =
    (location.state as { registeredEmail?: string } | null)?.registeredEmail ?? "";
  const [email, setEmail] = useState(registeredEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fillDemoCredentials = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const result = login(email, password);

    if (!result.ok) {
      setError(result.error);
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    navigate("/dashboard", { replace: true });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    submitted,
    registeredEmail,
    fillDemoCredentials,
    submit,
  };
}

function DemoCredentials({ onFill }: { onFill: () => void }) {
  return (
    <div className="border border-[#deded8] bg-[#f7f7f4] px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[7px] tracking-[0.12em] text-[#777777]">DEMO CREDENTIALS</p>
          <p className="mt-2 text-[10px] leading-4 text-[#555555]">
            Email: {DEMO_EMAIL}
            <br />
            Password: {DEMO_PASSWORD}
          </p>
        </div>
        <button
          type="button"
          onClick={onFill}
          className="shrink-0 border border-[#cfcfc8] bg-white px-3 py-2 font-mono text-[7px] font-medium tracking-[0.08em] text-[#7665ff] transition-colors hover:border-[#7665ff]"
        >
          USE DEMO
        </button>
      </div>
    </div>
  );
}

function Mark() {
  return (
    <div className="flex items-center gap-3" aria-label="CampusCode Hackathon Arena">
      <div className="flex h-8 w-10 -skew-x-[18deg] items-stretch">
        <span className="w-1/3 bg-[#111111]" />
        <span className="w-1/3 bg-[#7665ff]" />
        <span className="w-1/3 bg-[#8bcf19]" />
      </div>
      <div>
        <p className="font-black text-[12px] leading-none tracking-[0.14em] text-[#111111]">
          CAMPUSCODE
        </p>
        <p className="mt-1 font-mono text-[6px] tracking-[0.2em] text-[#999999]">HACKATHON ARENA</p>
      </div>
    </div>
  );
}

function Captcha({ value }: { value: string }) {
  const colors = ["#bf4ce5", "#5adcdc", "#bde24f", "#e65050", "#d7985a"];
  return (
    <div
      className="relative flex h-[52px] w-[152px] items-center justify-center overflow-hidden rounded-lg border border-[#2a2f45] bg-[#f4f4f0]"
      aria-label={`Captcha code ${value}`}
    >
      <span className="absolute left-[-8px] top-4 h-px w-44 rotate-[13deg] bg-[#4fe2e2]" />
      <span className="absolute left-2 top-8 h-px w-40 -rotate-[9deg] bg-[#d54d4d]" />
      <div className="relative flex -rotate-2 items-center gap-1">
        {value.split("").map((number, index) => (
          <span
            className="font-mono text-[29px] font-medium italic leading-none"
            style={{ color: colors[index % colors.length] }}
            key={`${number}-${index}`}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
}

function MobileLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState("23648");
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    submitted,
    registeredEmail,
    fillDemoCredentials,
    submit,
  } = useLoginForm();

  const nextCaptcha = () => {
    setCaptcha(Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join(""));
  };

  const status = useMemo(
    () => (submitted ? "DEMO DASHBOARD OPENED" : "DEMO MODE / NO AUTH SERVER"),
    [submitted],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-5 pb-8 pt-6 text-foreground min-[1100px]:hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -right-32 top-16 size-80 rounded-full bg-[#7665ff]/15 blur-[80px]" />
        <div className="absolute -left-24 bottom-10 size-72 rounded-full bg-[#a8e62e]/15 blur-[80px]" />
        <svg
          className="h-full w-full"
          viewBox="0 0 430 1100"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-40 280C80 180 145 390 262 238C330 149 383 151 470 78"
            stroke="#7665FF"
            strokeDasharray="7 10"
            opacity=".45"
          />
          <path
            d="M-30 720C100 600 188 690 286 544C356 440 394 492 465 390"
            stroke="#7665FF"
            strokeDasharray="7 10"
            opacity=".35"
          />
        </svg>
      </div>

      <header className="relative z-10 flex items-center justify-between">
        <Mark />
        <button
          onClick={() => navigate("/")}
          className="font-mono text-[8px] tracking-[0.14em] text-[#777777] transition-colors hover:text-[#111111]"
        >
          ← BACK TO HOME
        </button>
      </header>

      <section className="relative z-10 mx-auto mt-14 max-w-[520px]">
        <div className="mb-8">
          <div className="flex items-center gap-2 font-mono text-[8px] tracking-[0.13em] text-[#777777]">
            <span className="size-1.5 rounded-full bg-[#82b91a]" />
            CAMPUSCODE / AUTHENTICATION
          </div>
          <h1 className="mt-5 max-w-sm text-[clamp(3.4rem,17vw,5.3rem)] font-black leading-[0.78] tracking-[-0.085em] text-[#111111]">
            ENTER
            <br />
            THE <span className="text-[#7665ff]">ARENA.</span>
          </h1>
          <p className="mt-6 max-w-md text-[13px] leading-6 text-[#666666]">
            Sign in to continue building, collaborating and competing with the CampusCode community.
          </p>
        </div>

        <div className="border border-border bg-white/95 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="flex items-start justify-between border-b border-border px-6 py-7">
            <div>
              <p className="font-mono text-[8px] tracking-[0.14em] text-[#999999]">
                EXISTING ACCOUNT
              </p>
              <h2 className="mt-2 text-[34px] font-bold leading-none tracking-[-0.07em]">LOGIN</h2>
              <p className="mt-3 text-[10px] text-[#999999]">Access your CampusCode account.</p>
            </div>
            <p className="font-mono text-[8px] leading-4 text-[#bbbbbb]">
              CC
              <br />
              01
            </p>
          </div>

          <form className="space-y-6 px-6 py-7" onSubmit={submit}>
            <label className="block">
              <span className="mb-2 block font-mono text-[8px] tracking-[0.14em] text-[#777777]">
                EMAIL ADDRESS
              </span>
              <span className="flex h-14 items-center border border-[#d8d8d2] bg-[#fafaf8]">
                <span className="w-12 text-center font-mono text-[13px] text-[#aaaaaa]">@</span>
                <input
                  className="h-full min-w-0 flex-1 bg-transparent pr-4 text-[13px] text-[#111111] outline-none placeholder:text-[#999999]"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[8px] tracking-[0.14em] text-[#777777]">
                PASSWORD
              </span>
              <span className="flex h-14 items-center border border-[#d8d8d2] bg-[#fafaf8]">
                <span className="w-12 text-center text-[#aaaaaa]">•</span>
                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-[#111111] outline-none placeholder:text-[#999999]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="mr-3 flex items-center gap-1.5 px-2 py-2 font-mono text-[7px] tracking-[0.08em] text-[#888888]"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </span>
            </label>

            <DemoCredentials onFill={fillDemoCredentials} />

            {registeredEmail && (
              <p className="text-[11px] leading-5 text-[#5f8424]" role="status">
                Account created successfully. Sign in with your new credentials.
              </p>
            )}

            {error && (
              <p className="text-[11px] leading-5 text-[#b42318]" role="alert">
                {error}
              </p>
            )}

            <div>
              <span className="mb-2 block font-mono text-[8px] tracking-[0.14em] text-[#777777]">
                CAPTCHA
              </span>
              <div className="mb-3 flex items-center gap-3">
                <Captcha value={captcha} />
                <button
                  type="button"
                  onClick={nextCaptcha}
                  className="flex items-center gap-1.5 p-2 font-mono text-[7px] tracking-[0.08em] text-[#888888] transition-colors hover:text-[#111111]"
                >
                  <RefreshCw size={11} /> NEW
                </button>
              </div>
              <input
                className="h-14 w-full border border-[#d8d8d2] bg-[#fafaf8] px-4 text-[13px] text-[#111111] outline-none transition-colors placeholder:text-[#999999] focus:border-[#7665ff]"
                placeholder="Enter the code above"
                inputMode="numeric"
                pattern={captcha}
                title={`Enter ${captcha}`}
                required
              />
            </div>

            <div className="flex h-16 items-center justify-between rounded-xl border border-[#dddddd] bg-gradient-to-r from-[#f7f7f4] to-white px-3">
              <div className="relative flex h-8 w-[74px] items-center rounded-lg bg-[#111111] px-2">
                <span className="h-4 w-3 -skew-x-[18deg] rounded-sm bg-white" />
                <span className="ml-1 h-4 w-3 -skew-x-[18deg] rounded-sm bg-[#7665ff]" />
                <span className="ml-1 h-4 w-3 -skew-x-[18deg] rounded-sm bg-[#8bcf19]" />
                <span className="absolute -bottom-1 left-2 size-3 rounded-full border-2 border-white bg-[#111111]" />
                <span className="absolute -bottom-1 right-2 size-3 rounded-full border-2 border-white bg-[#111111]" />
              </div>
              <span className="mr-auto ml-2 self-start pt-2 text-[11px] tracking-[0.12em] text-[#888888]">
                Zzz
              </span>
              <span className="font-bold text-[10px] tracking-[0.12em] text-[#555555]">
                {submitted ? "SENT" : "READY"}
              </span>
              <span className="ml-2 h-9 w-1 rounded-full bg-[#82b91a]" />
            </div>

            <button
              type="submit"
              className="flex h-[58px] w-full items-center justify-between bg-[#111111] px-5 text-left text-[11px] font-extrabold tracking-[0.03em] text-white transition-colors hover:bg-[#7665ff] focus:outline-none focus:ring-2 focus:ring-[#7665ff] focus:ring-offset-2"
            >
              {submitted ? "OPENING DEMO DASHBOARD" : "ENTER DEMO DASHBOARD"}
              <ArrowUpRight size={18} className="text-[#a8e62e]" />
            </button>
            <button
              type="button"
              onClick={() =>
                window.alert("Password recovery requires a connected authentication backend.")
              }
              className="font-mono text-[7px] tracking-[0.07em] text-[#888888] hover:text-[#111111]"
            >
              FORGOT PASSWORD?
            </button>
          </form>

          <div className="flex items-center justify-between border-t border-border px-6 py-6 font-mono text-[8px]">
            <span className="text-[#999999]">DON&apos;T HAVE AN ACCOUNT?</span>
            <button onClick={() => navigate("/register")} className="font-medium text-[#7665ff]">
              CREATE ACCOUNT →
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-between font-mono text-[7px] tracking-[0.08em] text-[#aaaaaa]">
          <span>AUTH / 2026</span>
          <span className="flex items-center gap-2">
            <i className="size-1.5 rounded-full bg-[#82b91a]" />
            {status}
          </span>
        </div>
      </section>
    </main>
  );
}

function DesktopLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState("23648");
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    submitted,
    registeredEmail,
    fillDemoCredentials,
    submit,
  } = useLoginForm();

  const nextCaptcha = () => {
    setCaptcha(Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join(""));
  };

  return (
    <main className="relative hidden min-h-screen overflow-hidden bg-[#f8f8f5] text-[#111111] min-[1100px]:block">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.035)_1px,transparent_1px)] bg-[size:65px_65px]" />
      <div className="pointer-events-none absolute -right-24 top-0 h-full w-[42%] bg-[#7665ff]/5 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 size-[520px] rounded-full bg-[#a8e62e]/8 blur-[100px]" />
      <svg
        className="pointer-events-none absolute inset-0 size-full opacity-20"
        viewBox="0 0 1530 850"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M-80 565C130 415 238 603 424 392C582 213 684 84 850 228C1010 366 1168 344 1600 138"
          stroke="#7665FF"
          strokeDasharray="7 11"
        />
        <path
          d="M72 177C280 329 379 112 568 274C758 437 814 586 1089 467C1322 366 1440 391 1595 587"
          stroke="#7665FF"
          strokeDasharray="7 11"
        />
        <circle cx="674" cy="330" r="5" fill="#7665FF" />
        <circle cx="493" cy="560" r="5" fill="#7665FF" />
      </svg>

      <section className="relative z-10 grid min-h-screen grid-cols-[minmax(650px,1fr)_530px] gap-[clamp(54px,6vw,110px)] px-[clamp(70px,8vw,122px)] py-1">
        <div className="absolute right-10 top-8 z-20">
  <button
    type="button"
    onClick={() => window.location.href = "/"}
    className="font-mono text-[10px] tracking-wider text-[#777777] hover:text-[#7665ff]"
  >
    ← BACK TO HOME
  </button>
</div>
        <div className="flex min-h-[680px] flex-col justify-center py-16">
          <div className="max-w-[550px]">
            <div className="flex items-center justify-between font-mono text-[8px] tracking-[0.14em] text-[#92928c]">
              <span className="flex items-center gap-2.5">
                <i className="size-2 rounded-full bg-[#82b91a]" />
                CAMPUSCODE / AUTHENTICATION
              </span>
            </div>
            <div className="mt-7 flex items-center justify-between font-mono text-[7px] tracking-[0.14em] text-[#b0b0aa]">
              <span>ACCESS</span>
              <span>01 / 02</span>
            </div>

            <h1 className="mt-10 text-[clamp(105px,8.8vw,140px)] font-black leading-[0.79] tracking-[-0.085em]">
              ENTER
              <br />
              THE
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #8d8d88" }}>
                ARENA.
              </span>
            </h1>

            <p className="mt-8 max-w-[490px] text-[15px] leading-6 text-[#666666]">
              Sign in to continue building, collaborating and competing with the CampusCode
              community.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-2">
              {[
                ["01", "BUILD"],
                ["02", "COMPETE"],
                ["03", "SHIP"],
              ].map(([number, label], index) => (
                <div
                  className={`flex h-[126px] flex-col justify-between border border-[#deded8] p-4 ${index === 0 ? "bg-[#7665ff]/[0.06]" : "bg-white/35"}`}
                  key={label}
                >
                  <span className="font-mono text-[7px] text-[#aaaaaa]">{number}</span>
                  <strong className="text-[15px] font-extrabold tracking-[-0.03em]">{label}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="relative min-h-[680px] border-x border-b border-[#d8d8d2] bg-white/95 shadow-[0_30px_90px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="absolute inset-x-6 top-0 h-[3px] bg-gradient-to-r from-[#7665ff] via-[#9d93ff] to-[#8bcf19]" />
          <form className="flex h-full flex-col px-[38px] pb-5 pt-[45px]" onSubmit={submit}>
            <div className="flex items-start justify-between border-b border-[#e2e2dc] pb-7">
              <div>
                <p className="font-mono text-[8px] tracking-[0.14em] text-[#999999]">
                  EXISTING ACCOUNT
                </p>
                <h2 className="mt-4 text-[38px] font-bold leading-none tracking-[-0.07em]">
                  LOGIN
                </h2>
                <p className="mt-4 text-[10px] text-[#999999]">Access your CampusCode account.</p>
              </div>
              <p className="font-mono text-[8px] leading-4 text-[#bbbbbb]">
                CC
                <br />
                01
              </p>
            </div>

            <label className="mt-7 block">
              <span className="mb-3 block font-mono text-[8px] tracking-[0.14em] text-[#777777]">
                EMAIL ADDRESS
              </span>
              <span className="flex h-[55px] items-center border border-[#d8d8d2] bg-[#fafaf8]">
                <span className="w-12 text-center font-mono text-[13px] text-[#aaaaaa]">@</span>
                <input
                  className="h-full min-w-0 flex-1 bg-transparent pr-4 text-[13px] outline-none placeholder:text-[#999999]"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            <label className="mt-6 block">
              <span className="mb-3 block font-mono text-[8px] tracking-[0.14em] text-[#777777]">
                PASSWORD
              </span>
              <span className="flex h-[55px] items-center border border-[#d8d8d2] bg-[#fafaf8]">
                <span className="w-12 text-center text-[#aaaaaa]">•</span>
                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#999999]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="mr-3 flex items-center gap-1.5 p-2 font-mono text-[7px] tracking-[0.08em] text-[#888888]"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff size={11} /> : <Eye size={11} />}
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </span>
            </label>

            <div className="mt-4">
              <DemoCredentials onFill={fillDemoCredentials} />
            </div>

            {registeredEmail && (
              <p className="mt-3 text-[10px] leading-4 text-[#5f8424]" role="status">
                Account created successfully. Sign in with your new credentials.
              </p>
            )}

            {error && (
              <p className="mt-3 text-[10px] leading-4 text-[#b42318]" role="alert">
                {error}
              </p>
            )}

            <div className="mt-6">
              <span className="mb-3 block font-mono text-[8px] tracking-[0.14em] text-[#777777]">
                CAPTCHA
              </span>
              <div className="flex items-center gap-3">
                <Captcha value={captcha} />
                <button
                  type="button"
                  onClick={nextCaptcha}
                  className="flex items-center gap-1.5 p-2 font-mono text-[7px] tracking-[0.08em] text-[#888888]"
                >
                  <RefreshCw size={10} /> NEW
                </button>
              </div>
              <input
                className="mt-2 h-[55px] w-full border border-[#d8d8d2] bg-[#fafaf8] px-4 text-[13px] outline-none placeholder:text-[#999999] focus:border-[#7665ff]"
                placeholder="Enter the code above"
                inputMode="numeric"
                pattern={captcha}
                title={`Enter ${captcha}`}
                required
              />
            </div>

            <div className="mt-5 flex h-16 items-center rounded-xl border border-dashed border-[#dddddd] bg-white px-3">
              <div className="relative flex h-8 w-[74px] items-center rounded-lg bg-[#111111] px-2">
                <span className="h-4 w-3 -skew-x-[18deg] rounded-sm bg-white" />
                <span className="ml-1 h-4 w-3 -skew-x-[18deg] rounded-sm bg-[#7665ff]" />
                <span className="ml-1 h-4 w-3 -skew-x-[18deg] rounded-sm bg-[#8bcf19]" />
                <span className="absolute -bottom-1 left-2 size-3 rounded-full border-2 border-white bg-[#111111]" />
                <span className="absolute -bottom-1 right-2 size-3 rounded-full border-2 border-white bg-[#111111]" />
              </div>
              <span className="ml-2 self-start pt-2 text-[11px] tracking-[0.12em] text-[#888888]">
                Zzz
              </span>
              <span className="ml-auto text-[10px] font-bold tracking-[0.12em] text-[#555555]">
                {submitted ? "SENT" : "READY"}
              </span>
              <span className="ml-3 h-9 w-1 rounded-full bg-[#82b91a]" />
            </div>

            <button
              type="submit"
              className="mt-1 flex h-[60px] w-full items-center justify-between bg-[#111111] px-5 text-[11px] font-extrabold text-white transition-colors hover:bg-[#7665ff] focus:outline-none focus:ring-2 focus:ring-[#7665ff] focus:ring-offset-2"
            >
              {submitted ? "OPENING DEMO DASHBOARD" : "ENTER DEMO DASHBOARD"}
              <ArrowUpRight size={18} className="text-[#a8e62e]" />
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <div className="login-page">
      <MobileLogin />
      <DesktopLogin />
    </div>
  );
}
