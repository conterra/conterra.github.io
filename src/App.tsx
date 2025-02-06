import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from "react-router";

import { NavigationBar } from './components/NavigationBar'
import { PageNotFound } from './components/PageNotFound'
import { NewsPage } from './components/NewsPage/NewsPage'
import { BundleOverview } from './components/BundleOverview/BundleOverview';

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<NewsPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="overview" element={<BundleOverview />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
