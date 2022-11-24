// project import
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import Search from './Search';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <Search />
        <Navigation />
    </SimpleBar>
);

export default DrawerContent;
