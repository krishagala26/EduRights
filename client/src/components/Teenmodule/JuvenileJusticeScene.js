import React, { useState } from "react";

const h = React.createElement;

export default function JuvenileJusticeScene() {
  const [choice, setChoice] = useState(null);

  return h(
    "div",
    {
      className: "card tint-sky",
      style: {
        padding: "1rem",
        borderRadius: "14px",
      },
    },

    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        },
      },
      h("b", null, "Interactive Simulation: Fair or Unfair?"),
      h(
        "span",
        { className: "chip light" },
        choice ? "Decision Reviewed" : "Choose an Action"
      )
    ),

    h(
      "p",
      null,
      "A video of a 15-year-old student being taken to a police station starts spreading online. Many students immediately begin calling him a criminal."
    ),

    h(
      "div",
      { className: "btnrow" },

      h(
        "button",
        {
          type: "button",
          className: `btn sm ${choice === "a" ? "" : "ghost"}`,
          onClick: () => setChoice("a"),
        },
        "Share the Video"
      ),

      h(
        "button",
        {
          type: "button",
          className: `btn sm ${choice === "b" ? "" : "ghost"}`,
          onClick: () => setChoice("b"),
        },
        "Wait for Facts"
      ),

      h(
        "button",
        {
          type: "button",
          className: `btn sm ${choice === "c" ? "" : "ghost"}`,
          onClick: () => setChoice("c"),
        },
        "Make Jokes Online"
      )
    ),

    choice &&
      h(
        "div",
        {
          style: {
            marginTop: "1rem",
            padding: "0.8rem",
            borderRadius: "10px",
            background: "rgba(135,206,235,0.15)",
          },
        },

        h(
          "p",
          { style: { margin: 0 } },

          choice === "a"
            ? "🚨 Sharing videos or photos of children involved in legal matters can harm their privacy and future. Juvenile justice protects a child's dignity."

            : choice === "b"
            ? "✅ Best choice. Juvenile justice is based on fairness. Facts should be verified before anyone is judged, and every child deserves a chance to be heard."

            : "⚠️ Making jokes or spreading labels can seriously affect someone's confidence and future. Juvenile justice focuses on rehabilitation, not humiliation."
        )
      )
  );
}