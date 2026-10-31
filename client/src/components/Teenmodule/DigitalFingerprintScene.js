import React, { useState } from "react";

const h = React.createElement;

export default function DigitalFingerprintScene() {
  const [mode, setMode] = useState("idle");

  const nodes = [
    { id: 1, x: 215, y: 35, label: "Friend 1" },
    { id: 2, x: 315, y: 45, label: "Group B" },
    { id: 3, x: 340, y: 115, label: "Screenshots" },
    { id: 4, x: 270, y: 165, label: "Other School" },
  ];

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
      h("b", null, "Interactive Simulation: The Digital Ripple"),
      h(
        "span",
        { className: "chip light" },
        mode === "idle"
          ? "📱 Waiting for your move"
          : mode === "forwarded"
          ? "🚨 Exponential spread: 42 → 500+ views"
          : "🛡️ Chain broken & reported (1930)"
      )
    ),
    h(
      "svg",
      {
        viewBox: "0 0 400 200",
        width: "100%",
        height: "185",
        role: "img",
        "aria-label": "Digital footprint spread simulation",
        style: {
          background: "#ffffff",
          borderRadius: "10px",
          display: "block",
          marginBottom: "0.75rem",
        },
      },
      h("line", {
        x1: 65,
        y1: 100,
        x2: 140,
        y2: 100,
        stroke: "#24204A",
        strokeWidth: 3,
        strokeDasharray: "4 4",
      }),
      ...nodes.map((n) =>
        h("line", {
          key: `l-${n.id}`,
          x1: 140,
          y1: 100,
          x2: n.x,
          y2: n.y,
          stroke:
            mode === "forwarded"
              ? "#FF5C5C"
              : mode === "stopped"
              ? "#2BB673"
              : "#D5D2E8",
          strokeWidth: mode === "forwarded" ? 3 : 2,
          strokeDasharray: mode === "stopped" ? "5 5" : undefined,
        })
      ),
      h(
        "g",
        { transform: "translate(65, 100)" },
        h("circle", { r: 24, fill: "#FFC93C", stroke: "#24204A", strokeWidth: 3 }),
        h("text", { x: 0, y: 5, textAnchor: "middle", fontSize: 15 }, "💬"),
        h(
          "text",
          { x: 0, y: 40, textAnchor: "middle", fontSize: 9, fontWeight: "bold", fill: "#24204A" },
          "Class Chat (42)"
        )
      ),
      h(
        "g",
        { transform: "translate(140, 100)" },
        h("circle", {
          r: 26,
          fill: mode === "forwarded" ? "#FFE3E3" : mode === "stopped" ? "#D6F5E3" : "#8B6CFF",
          stroke: "#24204A",
          strokeWidth: 3,
        }),
        h(
          "text",
          { x: 0, y: 6, textAnchor: "middle", fontSize: 16 },
          mode === "forwarded" ? "😰" : mode === "stopped" ? "🛡️" : "📱"
        ),
        h(
          "text",
          { x: 0, y: 42, textAnchor: "middle", fontSize: 9, fontWeight: "bold", fill: "#24204A" },
          "Your Phone"
        )
      ),
      ...nodes.map((n) =>
        h(
          "g",
          {
            key: `n-${n.id}`,
            transform: `translate(${n.x}, ${n.y})`,
            style: { opacity: mode === "stopped" ? 0.35 : 1 },
          },
          h("circle", {
            r: 17,
            fill: mode === "forwarded" ? "#FF5C5C" : "#E4DCFF",
            stroke: "#24204A",
            strokeWidth: 2.5,
          }),
          h(
            "text",
            { x: 0, y: 5, textAnchor: "middle", fontSize: 11 },
            mode === "forwarded" ? "🔥" : "👤"
          ),
          h(
            "text",
            { x: 0, y: 29, textAnchor: "middle", fontSize: 9, fontWeight: "bold", fill: "#24204A" },
            n.label
          )
        )
      )
    ),
    h(
      "div",
      { className: "btnrow" },
      h(
        "button",
        {
          type: "button",
          className: `btn sm ${mode === "forwarded" ? "" : "ghost"}`,
          onClick: () => setMode("forwarded"),
        },
        "Forward to 1 friend"
      ),
      h(
        "button",
        {
          type: "button",
          className: `btn sm ${mode === "stopped" ? "" : "ghost"}`,
          onClick: () => setMode("stopped"),
        },
        "Block & Report (1930)"
      ),
      mode !== "idle" &&
        h(
          "button",
          {
            type: "button",
            className: "btn ghost sm",
            onClick: () => setMode("idle"),
          },
          "Reset"
        )
    ),
    mode !== "idle" &&
      h(
        "p",
        { className: "small", style: { marginTop: "0.65rem", marginBottom: 0 } },
        mode === "forwarded"
          ? "Forwarding to 'just one person' creates permanent copies and screenshots out of your control."
          : "Stopping the chain and reporting triggers the 2-hour takedown rule under the IT Rules."
      )
  );
}