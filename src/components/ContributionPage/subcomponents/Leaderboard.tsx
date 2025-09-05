import React from "react";
// import "./Leaderboard.css";

export interface LeaderboardEntry {
    name: string;
    value: number;
    color?: string;
}

export interface LeaderboardProps {
    title: string;
    entries: LeaderboardEntry[];
    vertical?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ title, entries, vertical = false }) => {
    const maxValue = Math.max(...entries.map(e => e.value), 1);

    if (vertical) {
        // Sort entries ascending by value for left-to-right bar order
        const sortedEntries = [...entries].sort((a, b) => a.value - b.value);
        return (
            <div className="leaderboard-section">
                <h3>{title}</h3>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '0rem', marginTop: '2rem' }}>
                    {/* Bars */}
                    {sortedEntries.map((entry, idx) => (
                        <div className="leaderboard-bar-vertical-item" key={entry.name} style={{ alignItems: 'flex-end', width: '40px' }}>
                            <div className="leaderboard-bar-vertical-bar-outer">
                                <div
                                    className="leaderboard-bar-vertical-bar-inner"
                                    style={{
                                        height: `${(entry.value / maxValue) * 120 + 10}px`,
                                        background: entry.color || '#005587',
                                    }}
                                />
                            </div>
                            <div className="leaderboard-value-vertical">{entry.value}</div>
                        </div>
                    ))}
                    {/* Names in a column */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '140px', marginLeft: '1rem', gap: '1rem' }}>
                        {sortedEntries.map((entry, idx) => (
                            <div className="leaderboard-name-vertical" key={entry.name} style={{ minWidth: 80 }}>{entry.name}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="leaderboard-section">
            <h3>{title}</h3>
            <div className="leaderboard-bar">
                {entries.map((entry, idx) => (
                    <div className="leaderboard-row" key={entry.name}>
                        <div className="leaderboard-name">{entry.name}</div>
                        <div className="leaderboard-bar-outer">
                            <div
                                className="leaderboard-bar-inner"
                                style={{
                                    width: `${(entry.value / maxValue) * 100}%`,
                                    background: entry.color || '#005587',
                                }}
                            />
                        </div>
                        <div className="leaderboard-value">{entry.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
