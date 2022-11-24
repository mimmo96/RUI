// project import
import Routes from 'routes';
import React from 'react';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeCustomization>
        <ScrollTop>
            <Routes>
            </Routes>
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
