import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({priceSort, setPriceSort, handleSortSelect}) {
    

    const handleChange = (event) => {
        setPriceSort(event.target.value);
        handleSortSelect(event);
    };

    return (
        <Box sx={{ minWidth: 176,  }}>
            <FormControl fullWidth size="small" shade='none'>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={priceSort}
                    onChange={handleChange}
                >
                    <MenuItem value={'new'}>Ən yenilər</MenuItem>
                    <MenuItem value={'asc'}>Ucuzdan bahaya</MenuItem>
                    <MenuItem value={'desc'}>Bahadan ucuza</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}