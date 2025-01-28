import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import JsonData from './data/data.json'
import { Octokit } from "@octokit/core";
import { BrowserRouter, Routes, Route } from "react-router";

import { NavBar } from './components/NavBar'
import { PageNotFound } from './components/PageNotFound'
import { NewsPage } from './components/NewsPage'
import { AboutPage } from './components/AboutPage'
import { ContactPage } from './components/ContactPage';
import { CompleteBundleOverview } from './components/CompleteBundleOverview';

function App() {
    const octokit = new Octokit({
        auth: process.env.REACT_APP_GITHUB_TOKEN
    });

    const [landingPageData, setLandingPageData] = useState<any | null>(null);
    const [gitHubRepoData, setGitHubRepoData] = useState<any>(null);

    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

    useEffect(() => {
        const fetchGitHubRepoData = async () => {
            try {
                const latestUpdatedRepos = await octokit.request('GET /orgs/{org}/repos', {
                    org: 'conterra',
                    type: 'public',
                    sort: 'updated',
                    per_page: 100,
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                });
                setGitHubRepoData(latestUpdatedRepos.data);
            } catch (error) {
                console.error('Error fetching API data:', error);
            }
        };

        fetchGitHubRepoData();
    }, []);

    return (
        <ChakraProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route index path="about" element={<AboutPage />} />
                    <Route path="news" element={<NewsPage />} />
                    <Route path="overview" element={<CompleteBundleOverview data={gitHubRepoData} />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
