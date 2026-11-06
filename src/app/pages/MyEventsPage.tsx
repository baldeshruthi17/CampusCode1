import { useState } from "react";
import { useNavigate } from "react-router";
import { getSession } from "../auth/auth";
import EventDetailsDialog from "../components/EventDetailsDialog";
import StudentShell from "../components/StudentShell";
import { campusEvents, type CampusEvent } from "../events/events";
import { getRegisteredEventIds } from "../events/registrations";

export default function MyEventsPage() {
  const navigate = useNavigate();
  const user = getSession();
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const registrations = user ? getRegisteredEventIds(user.email) : [];
  const myEvents = campusEvents.filter((event) => registrations.includes(event.id));

  if (!user) return null;

  return (
    <StudentShell user={user} activeLabel="My Events" pageLabel="MY EVENTS">
      <section className="my-events-page-content">
        <header className="catalog-heading my-events-heading">
          <div>
            <span className="my-events-kicker">MY ACTIVITY / LOCAL DEMO DATA</span>
            <h1>MY EVENTS.</h1>
            <p>
              Every event you joined, in one place. Open one to see its details, dates and status.
            </p>
          </div>
          <div className="catalog-count" aria-label={`${myEvents.length} registered events`}>
            <strong>{String(myEvents.length).padStart(2, "0")}</strong>
            <span>MY EVENTS</span>
          </div>
        </header>

        {myEvents.length ? (
          <div className="my-events-grid">
            {myEvents.map((event) => (
              <article className="my-event-card" key={event.id}>
                <div className="my-event-registration">
                  <span>REGISTRATION</span>
                  <strong>{event.id}</strong>
                </div>
                <div className="my-event-title-row">
                  <span
                    className={`catalog-event-logo ${event.status === "LIVE" ? "" : "completed"}`}
                  >
                    {event.initials}
                  </span>
                  <h2>{event.title}</h2>
                </div>
                <dl>
                  <div>
                    <dt>STATUS</dt>
                    <dd>{event.status === "LIVE" ? "REGISTERED" : "COMPLETED"}</dd>
                  </div>
                  <div>
                    <dt>PARTICIPATION</dt>
                    <dd>{event.participation}</dd>
                  </div>
                </dl>
                <button type="button" onClick={() => setSelectedEvent(event)}>
                  OPEN JOURNEY ↗
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="my-events-empty">
            <span className="catalog-event-logo">CC</span>
            <h2>NO EVENTS YET.</h2>
            <p>Register for a live CampusCode event and it will appear here automatically.</p>
            <button type="button" onClick={() => navigate("/events")}>
              EXPLORE EVENTS ↗
            </button>
          </div>
        )}
      </section>

      <EventDetailsDialog event={selectedEvent} registered onClose={() => setSelectedEvent(null)} />
    </StudentShell>
  );
}
