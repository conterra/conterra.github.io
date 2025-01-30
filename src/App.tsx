import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import JsonData from './data/data.json'
import { BrowserRouter, Routes, Route } from "react-router";

import { NavigationBar } from './components/NavigationBar'
import { PageNotFound } from './components/PageNotFound'
import { NewsPage } from './components/NewsPage/NewsPage'
import { AboutPage } from './components/AboutPage'
import { ContactPage } from './components/ContactPage';
import { BundleOverview } from './components/BundleOverview/BundleOverview';

function App() {
    const [landingPageData, setLandingPageData] = useState<any | null>(null);
    
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

    return (
        <ChakraProvider>
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route index path="about" element={<AboutPage />} />
                    <Route path="news" element={<NewsPage />} />
                    <Route path="overview" element={<BundleOverview />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
