import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import theme from './theme';

import { NavigationBar } from './components/NavigationBar/NavigationBar'
import { PageNotFound } from './components/PageNotFound'
import { AboutPage } from './components/AboutPage/AboutPage'
import { NewsPage } from './components/NewsPage/NewsPage'
import { BundleOverview } from './components/BundleOverview/BundleOverview';
import { ContributionPage } from './components/ContributionPage/ContributionPage';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <HashRouter>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Navigate to="/about" replace />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="news" element={<NewsPage />} />
                    <Route path="overview" element={<BundleOverview />} />
                    <Route path="contribution" element={<ContributionPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </HashRouter>
        </ChakraProvider>
    );
}

export default App;
