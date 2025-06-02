import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavigationBar } from './components/NavigationBar/NavigationBar'
import { PageNotFound } from './components/PageNotFound'
import { AboutPage } from './components/AboutPage/AboutPage'
import { NewsPage } from './components/NewsPage/NewsPage'
import { BundleOverview } from './components/BundleOverview/BundleOverview';

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<NewsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="news" element={<NewsPage />} />
                    <Route path="overview" element={<BundleOverview />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
