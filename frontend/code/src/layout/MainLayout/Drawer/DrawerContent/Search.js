// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';


const Search = () => (
    <Box sx={{ ml: 3, mr: 3 }}>
        <FormControl sx={{ width: '100%' } }>
            <OutlinedInput
                size="small"
                id="header-search"
                startAdornment={
                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                        <SearchOutlined />
                    </InputAdornment>
                }
                aria-describedby="header-search-text"
                inputProps={{
                    'aria-label': 'weight'
                }}
                placeholder="Search..."
            />
        </FormControl>
    </Box>
);

export default Search;
