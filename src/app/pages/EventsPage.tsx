import { useMemo, useState } from "react";
import EventDetailsDialog from "../components/EventDetailsDialog";
import StudentShell from "../components/StudentShell";
import { getSession } from "../auth/auth";
import { campusEvents, type CampusEvent, type EventCategory } from "../events/events";
import { getRegisteredEventIds, registerForEvent } from "../events/registrations";

type Filter = "All events" | "Hackathons" | "Quizzes";

const filters: Filter[] = ["All events", "Hackathons", "Quizzes"];

function categoryForFilter(filter: Filter): EventCategory | null {
  if (filter === "Hackathons") return "Hackathon";
  if (filter === "Quizzes") return "Quiz";
  return null;
}

export default function EventsPage() {
  const user = getSession();
  const [filter, setFilter] = useState<Filter>("All events");
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [registeredIds, setRegisteredIds] = useState<string[]>(() =>
    user ? getRegisteredEventIds(user.email) : [],
  );
  const [message, setMessage] = useState("");

  const filteredEvents = useMemo(() => {
    const category = categoryForFilter(filter);
    return category ? campusEvents.filter((event) => event.category === category) : campusEvents;
  }, [filter]);

  if (!user) return null;

  const register = (event: CampusEvent) => {
    const result = registerForEvent(user.email, event.id);
    if (!result.ok) {
      setMessage(result.error);
      return;
    }
    setRegisteredIds((current) => [...current, event.id]);
    setMessage(`Registration confirmed for ${event.title}. It is now in My Events.`);
  };

  return (
    <StudentShell user={user} activeLabel="Events" pageLabel="EVENTS" designVariant="events">
      <section className="events-page-content">
        <header className="catalog-heading">
          <div>
            <span className="catalog-kicker">DISCOVER / BACKEND DATA</span>
            <h1>EVENTS.</h1>
            <p>
              Explore CampusCode events — hackathons, quizzes, workshops — and join the ones you
              want.
            </p>
          </div>
          <div className="catalog-count" aria-label={`${campusEvents.length} total events`}>
            <strong>{String(campusEvents.length).padStart(2, "0")}</strong>
            <span>LIVE DATA</span>
          </div>
        </header>

        <div className="event-filters" role="tablist" aria-label="Event categories">
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="catalog-grid">
          {filteredEvents.map((event) => {
            const registered = registeredIds.includes(event.id);
            return (
              <article className="catalog-event-card" key={event.id}>
                <img className="catalog-event-banner" src={event.banner} alt="" />
                <div className="catalog-event-meta">
                  <span>{event.id}</span>
                  <strong className={event.status === "LIVE" ? "is-live" : ""}>
                    {event.status}
                  </strong>
                </div>
                <div className="catalog-event-title">
                  <span
                    className={`catalog-event-logo ${event.status === "LIVE" ? "" : "completed"}`}
                  >
                    {event.initials}
                  </span>
                  <h2>{event.title}</h2>
                </div>
                <p className="catalog-event-type">
                  {event.category.toUpperCase()} · {event.participation.toUpperCase()}
                </p>
                <p className="catalog-event-description">{event.description}</p>
                <div className="catalog-event-facts">
                  <div>
                    <span>MODE</span>
                    <strong>—</strong>
                  </div>
                  <div>
                    <span>{event.category === "Quiz" ? "FORMAT" : "TEAM SIZE"}</span>
                    <strong>{event.participation}</strong>
                  </div>
                  <div>
                    <span>START</span>
                    <strong>{event.status === "LIVE" ? "06 Nov 2026" : "—"}</strong>
                  </div>
                </div>
                <div className="catalog-event-actions">
                  <button type="button" onClick={() => setSelectedEvent(event)}>
                    VIEW DETAILS
                  </button>
                  {event.status === "LIVE" ? (
                    <button
                      className="primary"
                      type="button"
                      disabled={registered}
                      onClick={() => register(event)}
                    >
                      {registered ? "✓ JOINED" : "REGISTER ↗"}
                    </button>
                  ) : (
                    <button type="button" disabled>
                      COMPLETED
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {message && (
        <button className="event-confirmation" onClick={() => setMessage("")} aria-live="polite">
          {message}
        </button>
      )}

      <EventDetailsDialog
        event={selectedEvent}
        registered={selectedEvent ? registeredIds.includes(selectedEvent.id) : false}
        onClose={() => setSelectedEvent(null)}
        onRegister={register}
      />
    </StudentShell>
  );
}
