import "./ContributionPage.css";
import { Leaderboard } from "./subcomponents/Leaderboard";
import { PieChart } from "./subcomponents/PieChart";
import config from "../../config.json";

export const ContributionPage = () => {
  const leaderboardData = config.leaderboardData;
  const issuesData = config.issuesData;

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
          {issuesData.map((issue) => (
            <div className="issue-card" key={issue.id}>
              <div className="issue-card-header">
                <h3>{issue.title}</h3>
                <PieChart 
                  data={issue.contributors.map(c => c.value)} 
                  colors={issue.contributors.map(c => c.color)} 
                />
              </div>
              <p className="issue-description">{issue.description}</p>
              <div className="issue-date">{issue.date}</div>
              <div className="issue-id">{issue.issueId}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContributionPage;