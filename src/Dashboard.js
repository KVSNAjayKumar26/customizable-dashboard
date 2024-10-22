import React, {  useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout';
import { motion } from 'framer-motion';
import styled, { ThemeProvider } from 'styled-components';


// Define light and dark themes
const lightTheme = {
    background: '#f9f9f9',
    widgetBackground: '#ffffff',
    color: '#000000',
};

const darkTheme = {
    background: '#1c1c1e',
    widgetBackground: '#333333',
    color: '#ffffff',
};

// Styled container with theme support
const DashboardContainer = styled.div`
background-color: ${(props) => props.theme.background};
color: ${(props) => props.theme.color};
min-height: 100vh;
padding: 20px;
`;

// Reusable widget component with animations
const Widget = ({ title, children }) => {
    return (
        <motion.div
            style={{
                backgroundColor: 'inherit',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3>{title}</h3>
            {children}
        </motion.div>
    );
};
const Dashboard = () => {
    const defaultLayout = [
        { i: 'a', x: 0, y: 0, w: 2, h: 2 },
        { i: 'b', x: 2, y: 0, w: 2, h: 2 },
        { i: 'c', x: 4, y: 0, w: 2, h: 2 },
    ];

    const [layout, setLayout] = useState(defaultLayout);
    const [theme, setTheme] = useState(lightTheme);

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    // Save layout to localStorage
    useEffect(() => {
        const savedLayout = localStorage.getItem('dashboardLayout');
        if (savedLayout) {
            setLayout(JSON.parse(savedLayout));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    }, [layout]);
    return (
        <ThemeProvider theme={theme}>
            <DashboardContainer>
                <button onClick={toggleTheme} style={{ marginBottom: '20px' }}>
                    Toggle Theme
                </button>
                <GridLayout
                className='layout'
                layout={layout}
                cols={6}
                rowHeight={100}
                width={1200}
                onLayoutChange={(newLayout) => setLayout(newLayout)}
                >
                    <div key="a" style={{ backgroundColor: theme.widgetBackground }}>
                        <Widget title="Sales">
                            {/* Sales widget content */}
                            <p>Sales data visualization goes here.</p>
                        </Widget>
                    </div>
                    <div key="b" style={{ backgroundColor: theme.widgetBackground }}>
                        <Widget title="Traffic">
                            {/* Traffic widget content */}
                            <p>Traffic data visualization goes here.</p>
                        </Widget>
                    </div>
                    <div key="c" style={{ backgroundColor: theme.widgetBackground }}>
                        <Widget title="Performance">
                            {/* Performance widget content */}
                            <p>Performance metrics go here.</p>
                        </Widget>
                    </div>
                </GridLayout>
            </DashboardContainer>
        </ThemeProvider>
    )
}

export default Dashboard