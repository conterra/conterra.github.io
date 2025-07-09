import React from "react";
import "./ContributionPage.css";
import { Leaderboard } from "./Leaderboard";

/**
 * ContributionPage - Shows information and guidelines for contributing to the project.
 */
export const ContributionPage = () => {
  // Dummy leaderboard data
  const leaderboardData = [
    [
      { name: "Alice", value: 120, color: "#005587" },
      { name: "Bob", value: 100, color: "#2ecc40" },
      { name: "Charlie", value: 80, color: "#f39c12" },
      { name: "Diana", value: 60, color: "#e74c3c" },
      { name: "Eve", value: 40, color: "#eee" },
    ],
    [
      { name: "Frank", value: 110, color: "#005587" },
      { name: "Grace", value: 90, color: "#2ecc40" },
      { name: "Heidi", value: 70, color: "#f39c12" },
      { name: "Ivan", value: 50, color: "#e74c3c" },
      { name: "Judy", value: 30, color: "#eee" },
    ],
    [
      { name: "Mallory", value: 105, color: "#005587" },
      { name: "Niaj", value: 85, color: "#2ecc40" },
      { name: "Olivia", value: 65, color: "#f39c12" },
      { name: "Peggy", value: 45, color: "#e74c3c" },
      { name: "Sybil", value: 25, color: "#eee" },
    ],
  ];
  return (
    <div className="contribution-page horizontal-layout">
      <div className="leaderboards-row">
        <Leaderboard title="Top Contributors" entries={leaderboardData[0]} vertical />
        <Leaderboard title="Most Issues Closed" entries={leaderboardData[1]} vertical />
        <Leaderboard title="Most Reviews" entries={leaderboardData[2]} vertical />
      </div>
      <div className="issues-section">
        <h2>Open GitHub Issues</h2>
        <div className="issue-list">
          {dummyIssues.map((issue) => (
            <div className="issue-card" key={issue.id}>
              <div className="issue-card-header">
                <h3>{issue.title}</h3>
                <PieChart data={issue.pieData} colors={issue.pieColors} />
              </div>
              <p className="issue-description">{issue.description}</p>
              <div className="issue-date">{issue.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Simple PieChart SVG component
 */
function PieChart({ data, colors, size = 64 }: { data: number[]; colors: string[]; size?: number }) {
  // Ensure grey is always last in clockwise order
  let pieData = data;
  let pieColors = colors;
  // Find grey color index (assume #eee is grey)
  const greyIdx = colors.findIndex(c => c.toLowerCase() === '#eee');
  if (greyIdx !== -1 && greyIdx !== data.length - 1) {
    // Move grey segment to the end
    const newData = [...data];
    const newColors = [...colors];
    const greyValue = newData.splice(greyIdx, 1)[0];
    const greyColor = newColors.splice(greyIdx, 1)[0];
    newData.push(greyValue);
    newColors.push(greyColor);
    pieData = newData;
    pieColors = newColors;
  }
  const total = pieData.reduce((sum, val) => sum + val, 0);
  let startAngle = 0;
  const center = size / 2;
  const radius = size / 2;

  // Helper to describe an arc, with optional border for visually distinct segments
  function describeArc(start: number, end: number, color: string, border: boolean) {
    const startRadians = (start - 90) * (Math.PI / 180);
    const endRadians = (end - 90) * (Math.PI / 180);
    const x1 = center + radius * Math.cos(startRadians);
    const y1 = center + radius * Math.sin(startRadians);
    const x2 = center + radius * Math.cos(endRadians);
    const y2 = center + radius * Math.sin(endRadians);
    const largeArc = end - start > 180 ? 1 : 0;
    // Add a white border between segments if border is true
    const stroke = border ? 'white' : 'none';
    const strokeWidth = border ? 2 : 0;
    return (
      `<path d="M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z" fill="${color}" stroke="${stroke}" stroke-width="${strokeWidth}" />`
    );
  }

  let paths = "";
  for (let i = 0; i < pieData.length; i++) {
    const value = pieData[i];
    const angle = (value / total) * 360;
    const endAngle = startAngle + angle;
    // Add a white border between all segments
    const border = true;
    paths += describeArc(startAngle, endAngle, pieColors[i % pieColors.length], border);
    startAngle = endAngle;
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}> 
      <circle r={radius} cx={center} cy={center} fill="#eee" />
      <g dangerouslySetInnerHTML={{ __html: paths }} />
    </svg>
  );
}

// Dummy data for GitHub issues
const dummyIssues = [
  {
    id: 1,
    title: "Add dark mode support",
    description: "Implement a dark mode toggle for the application UI.",
    date: "2025-07-01",
    pieData: [40, 60], // 40 grey, 60 blue
    pieColors: ["#eee", "#005587"],
  },
  {
    id: 2,
    title: "Improve mobile responsiveness",
    description: "Fix layout issues on mobile devices.",
    date: "2025-06-28",
    pieData: [50, 30, 20], // 50 blue, 30 green, 20 grey
    pieColors: ["#005587", "#2ecc40", "#eee"],
  },
  {
    id: 3,
    title: "Add contribution guidelines",
    description: "Create a CONTRIBUTING.md file with clear steps.",
    date: "2025-06-20",
    pieData: [40, 30, 30], // 40 blue, 30 green, 30 green
    pieColors: ["#005587", "#2ecc40", "#2ecc40"],
  },
];

export default ContributionPage;
