import { campusEvents } from "./events";

const REGISTRATIONS_KEY = "campuscode_demo_event_registrations";

type Registrations = Record<string, string[]>;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function readRegistrations(): Registrations {
  try {
    const value = localStorage.getItem(REGISTRATIONS_KEY);
    if (!value) return {};
    const registrations = JSON.parse(value);
    return registrations && typeof registrations === "object" ? registrations : {};
  } catch {
    return {};
  }
}

export function getRegisteredEventIds(email: string) {
  return readRegistrations()[normalizeEmail(email)] ?? [];
}

export function registerForEvent(
  email: string,
  eventId: string,
): { ok: true } | { ok: false; error: string } {
  const event = campusEvents.find((candidate) => candidate.id === eventId);
  if (!event) return { ok: false, error: "This event could not be found." };
  if (event.status !== "LIVE") {
    return { ok: false, error: "Registration is closed for completed events." };
  }

  const registrations = readRegistrations();
  const userKey = normalizeEmail(email);
  const current = registrations[userKey] ?? [];
  if (current.includes(eventId)) {
    return { ok: false, error: "You are already registered for this event." };
  }

  registrations[userKey] = [...current, eventId];
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  return { ok: true };
}
