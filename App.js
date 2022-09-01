import { ThemeContextProvider } from './context';

import Home from './screens/home';

export default function App() {
    
    return (
        <ThemeContextProvider>
            <Home />
        </ThemeContextProvider>
    );
}

