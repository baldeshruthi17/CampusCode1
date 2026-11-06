import { useEffect } from "react";
import type { CampusEvent } from "../events/events";

export default function EventDetailsDialog({
  event,
  registered,
  onClose,
  onRegister,
}: {
  event: CampusEvent | null;
  registered: boolean;
  onClose: () => void;
  onRegister?: (event: CampusEvent) => void;
}) {
  useEffect(() => {
    if (!event) return;
    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const canRegister = event.status === "LIVE" && !registered && onRegister;

  return (
    <div className="event-dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="event-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-dialog-title"
        onMouseDown={(mouseEvent) => mouseEvent.stopPropagation()}
      >
        <button className="event-dialog-close" onClick={onClose} aria-label="Close event details">
          ×
        </button>
        <img src={event.banner} alt="" />
        <div className="event-dialog-content">
          <div className="event-dialog-meta">
            <span>{event.id}</span>
            <strong className={event.status === "LIVE" ? "is-live" : ""}>{event.status}</strong>
          </div>
          <div className="event-dialog-title-row">
            <span className={`catalog-event-logo ${event.status === "LIVE" ? "" : "completed"}`}>
              {event.initials}
            </span>
            <div>
              <p>
                {event.category.toUpperCase()} · {event.participation.toUpperCase()}
              </p>
              <h2 id="event-dialog-title">{event.title}</h2>
            </div>
          </div>
          <p className="event-dialog-description">{event.description}</p>
          <dl>
            <div>
              <dt>DATE</dt>
              <dd>{event.date}</dd>
            </div>
            <div>
              <dt>TIME</dt>
              <dd>{event.time}</dd>
            </div>
          </dl>
          {event.status === "COMPLETED" ? (
            <button className="event-dialog-action" type="button" disabled>
              EVENT COMPLETED
            </button>
          ) : registered ? (
            <button className="event-dialog-action" type="button" disabled>
              ALREADY REGISTERED
            </button>
          ) : (
            <button
              className="event-dialog-action"
              type="button"
              onClick={() => canRegister && onRegister(event)}
            >
              REGISTER FOR EVENT ↗
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
