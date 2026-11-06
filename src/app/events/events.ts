export type EventCategory = "Hackathon" | "Quiz";
export type EventStatus = "LIVE" | "COMPLETED";

export type CampusEvent = {
  id: string;
  title: string;
  category: EventCategory;
  participation: string;
  status: EventStatus;
  initials: string;
  description: string;
  date: string;
  time: string;
  banner: string;
};

export const campusEvents: readonly CampusEvent[] = [
  {
    id: "e2798ce3-a1b5-4806-9147-4d9f10c52ef1",
    title: "ReBuild '26",
    category: "Hackathon",
    participation: "Individual",
    status: "LIVE",
    initials: "RE",
    description:
      "ReBuild '26 is an individual dashboard-recreation hackathon by CampusCode. You participate alone, but you must create a team name for tracking and use it on your Unstop registration, the CampusCode portal, and every submission. Round 1: Recreate the CampusCode user flow faithfully — Dashboard, Login, Register, and Student dashboard — and submit your demo any time till 10 PM. Round 2: Top performers build a complete new UI in CampusCode's vibe.",
    date: "Friday, 6 November 2026",
    time: "10:00 AM – 10:00 PM",
    banner: "/assets/94c42.png",
  },
  {
    id: "20864c76-4792-4b09-a2e9-ff6764bf20d6",
    title: "FirstCommit '26 Quiz Competition 2.0",
    category: "Quiz",
    participation: "Solo",
    status: "COMPLETED",
    initials: "FQ",
    description: "This is the reattempt quiz for those who missed the earlier competition.",
    date: "Sunday, 8 November 2026",
    time: "30 minutes",
    banner: "/assets/cc062.png",
  },
  {
    id: "80299fc1-3e30-466f-a146-fd45c77c84be",
    title: "FirstCommit '26 Quiz Competition",
    category: "Quiz",
    participation: "Solo",
    status: "COMPLETED",
    initials: "FQ",
    description:
      "The quiz features 50 questions across technology, AI, and engineering — 42 multiple-choice questions and 8 true/false questions — to be completed in 30 minutes on Sunday, 1 November 2026. It is conducted online on the CampusCode platform, and every participant gets a single attempt.",
    date: "Sunday, 1 November 2026",
    time: "30 minutes",
    banner: "/assets/cc062.png",
  },
];
