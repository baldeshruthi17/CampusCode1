export type AuthUser = {
  name: string;
  email: string;
  role: "Student";
};

type StoredUser = AuthUser & {
  password: string;
};

export type RegistrationInput = {
  name: string;
  email: string;
  password: string;
  role: "Student";
};

export type AuthResult = { ok: true; user: AuthUser } | { ok: false; error: string };

export type RegistrationResult = { ok: true; user: AuthUser } | { ok: false; error: string };

const REGISTERED_USERS_KEY = "campuscode_demo_registered_users";
const SESSION_KEY = "campuscode_demo_session";

export const demoUsers: readonly StoredUser[] = [
  {
    name: "Shruthi",
    email: "shruthi@campuscode.com",
    password: "Shruthi@123",
    role: "Student",
  },
  {
    name: "Rahul",
    email: "rahul@campuscode.com",
    password: "Rahul@123",
    role: "Student",
  },
  {
    name: "Priya",
    email: "priya@campuscode.com",
    password: "Priya@123",
    role: "Student",
  },
];

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toAuthUser(user: StoredUser): AuthUser {
  return { name: user.name, email: user.email, role: user.role };
}

function readRegisteredUsers(): StoredUser[] {
  try {
    const value = localStorage.getItem(REGISTERED_USERS_KEY);
    if (!value) return [];
    const users = JSON.parse(value);
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

export function login(email: string, password: string): AuthResult {
  const normalizedEmail = normalizeEmail(email);
  const user = [...demoUsers, ...readRegisteredUsers()].find(
    (candidate) =>
      normalizeEmail(candidate.email) === normalizedEmail && candidate.password === password,
  );

  if (!user) {
    return { ok: false, error: "Incorrect email or password. Please check your credentials." };
  }

  const sessionUser = toAuthUser(user);
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  return { ok: true, user: sessionUser };
}

export function register(input: RegistrationInput): RegistrationResult {
  const normalizedEmail = normalizeEmail(input.email);
  const allUsers = [...demoUsers, ...readRegisteredUsers()];

  if (allUsers.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const user: StoredUser = {
    name: input.name.trim(),
    email: normalizedEmail,
    password: input.password,
    role: input.role,
  };
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([...readRegisteredUsers(), user]));

  return { ok: true, user: toAuthUser(user) };
}

export function getSession(): AuthUser | null {
  try {
    const value = localStorage.getItem(SESSION_KEY);
    if (!value) return null;
    const session = JSON.parse(value) as AuthUser;
    return session?.name && session?.email && session?.role === "Student" ? session : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
