import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    // Initialize mode state from localStorage or system preference
    const [mode, setMode] = useState<'light' | 'dark'>(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    // Update <body> class and save mode to localStorage on mode change
    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(mode);
        localStorage.setItem('theme', mode);
    }, [mode]);

    const toggleMode = () => {
        setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <div className="toggle-switch" onClick={toggleMode}>
            <div className="icon sun"><Sun size={24} /></div>
            <div className="icon moon"><Moon size={24} /></div>
            <div className={`slider ${mode}`} />
        </div>
    );
};

export default ThemeToggle;
