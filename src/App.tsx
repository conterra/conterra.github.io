import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import JsonData from './data/data.json'
import { Octokit } from "@octokit/core";


import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from './components/navbar'
import { Nopage } from './components/nopage'
import { About } from './components/about'
import { Contact } from './components/contact';
import { Features } from './components/features';

function App() {
    interface LandingPageData {
        Services: any;
        Features: any
    }

    const octokit = new Octokit({
        auth: process.env.REACT_APP_GITHUB_TOKEN
    });

    const [landingPageData, setLandingPageData] = useState<LandingPageData | null>(null);
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
                <Navbar />
                <Routes>
                    <Route index element={<About />} />
                    <Route path="features" element={<Features data={gitHubRepoData} />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<Nopage />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
