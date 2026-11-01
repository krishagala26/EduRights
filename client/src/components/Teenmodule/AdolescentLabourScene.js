import React, { useState } from "react";

const h = React.createElement;

export default function AdolescentLabourScene() {
  const [choice, setChoice] = useState(null);

  return h(
    "div",
    {
      className: "card tint-sun",
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
        },
      },

      h("b", null, "Interactive Simulation: Safe Job or Unsafe Job?"),

      h(
        "span",
        { className: "chip light" },
        choice ? "Decision Reviewed" : "Choose an Action"
      )
    ),

    h(
      "p",
      null,
      "A 15-year-old student is offered a weekend factory job that pays well, but the machines look dangerous."
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
        "Accept Immediately"
      ),

      h(
        "button",
        {
          type: "button",
          className: `btn sm ${choice === "b" ? "" : "ghost"}`,
          onClick: () => setChoice("b"),
        },
        "Check if Work is Safe & Legal"
      ),

      h(
        "button",
        {
          type: "button",
          className: `btn sm ${choice === "c" ? "" : "ghost"}`,
          onClick: () => setChoice("c"),
        },
        "Drop Out of School"
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
            background: "rgba(255,193,7,0.15)",
          },
        },

        h(
          "p",
          { style: { margin: 0 } },

          choice === "a"
            ? "⚠️ Not the safest choice. Before accepting work, adolescents should check whether the work is legal, safe and does not interfere with education."

            : choice === "b"
            ? "✅ Best choice. Young people should ensure work is legal, safe and does not put their health or future education at risk."

            : "🚨 Education is important for future opportunities. Leaving school early can limit choices and opportunities later in life."
        )
      )
  );
}