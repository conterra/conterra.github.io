import React from "react";
import "./ContributionPage.css";

/**
 * ContributionPage - Shows information and guidelines for contributing to the project.
 */
export const ContributionPage = () => {
  return (
    <div className="contribution-page">
      <h1>Contribution</h1>
      <section className="contribution-section">
        <h2>How to Contribute</h2>
        <ul>
          <li>
            Fork the repository and create your branch from{" "}
            <code>main</code>.
          </li>
          <li>Make your changes and ensure code quality.</li>
          <li>
            Submit a pull request with a clear description of your changes.
          </li>
        </ul>
      </section>
      <section className="contribution-section">
        <h2>Reporting Issues</h2>
        <p>
          If you find a bug or have a feature request, please open an issue on
          GitHub with detailed information.
        </p>
      </section>
      <section className="contribution-section">
        <h2>Contact</h2>
        <p>
          For questions, contact us at{" "}
          <a href="mailto:developernetwork@conterra.de">
            developernetwork@conterra.de
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default ContributionPage;
