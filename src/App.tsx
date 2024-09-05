import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import JsonData from './data/data.json'

import Navbar from './components/navbar'
import { About } from './components/about'
import { Contact } from './components/contact';
import { Features } from './components/features';

function App() {
    interface LandingPageData {
        Services: any; // Replace 'any' with the actual type of the 'Services' property
        // Add other properties if necessary
    }

    const [landingPageData, setLandingPageData] = useState<LandingPageData | null>(null)
    useEffect(() => {
        setLandingPageData(JsonData)
    }, [])


    return (
        <ChakraProvider>
            <div className="App">
                <Navbar />
                <div className="main_content" style={{ paddingTop: 80 }}>
                    <About data={landingPageData?.Services} />
                    <Contact data={landingPageData?.Services} />
                    <Features data={landingPageData?.Services} />
                </div>
            </div>
        </ChakraProvider>
    );
}

export default App;
