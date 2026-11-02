import React, { useState } from "react";

const h = React.createElement;

const ROUTES = {
  protection: {
    label: "Child in Distress / Abuse",
    number: "1098 / POCSO e-Box",
    portal: "Childline & NCPCR",
    color: "#2BB673",
    bg: "#D6F5E3",
    steps: ["Call 1098 or click POCSO e-Box", "Confidential intake by responder", "CWC & Local Support Action"],
  },
  rights: {
    label: "School / Rights Violation",
    number: "e-BaalNidan Portal",
    portal: "ebaalnidan.nic.in",
    color: "#8B6CFF",
    bg: "#E4DCFF",
    steps: ["File online with a trusted adult", "Get unique Tracking ID", "NCPCR / SCPCR issues notice"],
  },
  cyber: {
    label: "Cyber Blackmail / Scam",
    number: "1930 Helpline",
    portal: "cybercrime.gov.in",
    color: "#FF7A59",
    bg: "#FFE3DC",
    steps: ["Save unedited screenshots", "Report on 1930 or portal", "Platform takedown / Bank freeze"],
  },
  emergency: {
    label: "Immediate Physical Danger",
    number: "112 ERSS",
    portal: "National Emergency Number",
    color: "#FF5C5C",
    bg: "#FFE3E3",
    steps: ["Dial 112 or press SOS button", "Location shared with dispatch", "Immediate Police / Medical aid"],
  },
};

export default function GrievancePortalsScene() {
  const [selected, setSelected] = useState("protection");
  const current = ROUTES[selected];

  return h(
    "div",
    {
      className: "card tint-mint",
      style: { padding: "1rem", borderRadius: "14px" },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "0.75rem",
        },
      },
      h("b", null, "Interactive Switchboard: Pick a Situation to Trace the Action Path"),
      h("span", { className: "chip light" }, `⚡ Direct Line: ${current.number}`)
    ),
    h(
      "div",
      { className: "btnrow", style: { marginBottom: "0.75rem" } },
      ...Object.entries(ROUTES).map(([key, item]) =>
        h(
          "button",
          {
            key,
            type: "button",
            className: `btn sm ${selected === key ? "" : "ghost"}`,
            onClick: () => setSelected(key),
          },
          item.label
        )
      )
    ),
    h(
      "svg",
      {
        viewBox: "0 0 420 140",
        width: "100%",
        height: "140",
        role: "img",
        "aria-label": `Flowchart showing 3 steps for ${current.label}`,
        style: {
          background: "#ffffff",
          borderRadius: "10px",
          display: "block",
        },
      },
      // Connecting lines
      h("line", {
        x1: 75,
        y1: 65,
        x2: 210,
        y2: 65,
        stroke: current.color,
        strokeWidth: 4,
      }),
      h("line", {
        x1: 210,
        y1: 65,
        x2: 345,
        y2: 65,
        stroke: current.color,
        strokeWidth: 4,
        strokeDasharray: "6 4",
      }),
      // Step 1 Node
      h(
        "g",
        { transform: "translate(75, 65)" },
        h("circle", { r: 26, fill: current.bg, stroke: "#24204A", strokeWidth: 3 }),
        h("text", { x: 0, y: 6, textAnchor: "middle", fontSize: 16 }, "1️⃣"),
        h(
          "text",
          { x: 0, y: 44, textAnchor: "middle", fontSize: 9, fontWeight: "bold", fill: "#24204A" },
          current.steps[0]
        )
      ),
      // Step 2 Node
      h(
        "g",
        { transform: "translate(210, 65)" },
        h("circle", { r: 26, fill: current.bg, stroke: "#24204A", strokeWidth: 3 }),
        h("text", { x: 0, y: 6, textAnchor: "middle", fontSize: 16 }, "🔒"),
        h(
          "text",
          { x: 0, y: 44, textAnchor: "middle", fontSize: 9, fontWeight: "bold", fill: "#24204A" },
          current.steps[1]
        )
      ),
      // Step 3 Node
      h(
        "g",
        { transform: "translate(345, 65)" },
        h("circle", { r: 26, fill: current.bg, stroke: "#24204A", strokeWidth: 3 }),
        h("text", { x: 0, y: 6, textAnchor: "middle", fontSize: 16 }, "✅"),
        h(
          "text",
          { x: 0, y: 44, textAnchor: "middle", fontSize: 9, fontWeight: "bold", fill: "#24204A" },
          current.steps[2]
        )
      )
    )
  );
}