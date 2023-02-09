import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Order from './Order';
import { Link } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;



    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function OrdersTabPanel({ ordersList }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getDate = (date) => {
        const dateObj = new Date(date)
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const newdata = `${day}.${month}.${year}`
        return newdata;
    }

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 400, borderRadius: 2 }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', paddingTop: 1 }}
            >
                {ordersList.map((orderLabel, i) => {
                    return <Tab label={`Sifariş nömrə: ${i + 1}`} key={i} {...a11yProps(i)} />
                })}
            </Tabs>

            {ordersList.map((item, i) => {
                return (
                    <TabPanel style={{ width: '100%', height: '100%' }} value={value} key={i} index={i}>
                        <div className='flex h-full flex-col grow-1'>
                            <div className='flex justify-left items-centerflex-wrap grow mb-16'>
                                {item.order.line_items.map((item, i) => {
                                    return (
                                        <div className='w-28 h-28'><img src={item.image.url} alt="" /></div>
                                    )
                                })}
                            </div>
                            <div className="information w-full flex justify-between items-center">
                                <div className='flex flex-col'>
                                    <p className='text-xs text-gray-500 mb-1'>Sifariş tarixi:</p>
                                    <p className='text-gray-700 mb-3'>{getDate(item.created)}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-xs text-gray-500 mb-1'>Ümumi məbləğ:</p>
                                    <p className='text-sm text-rose-700 font-medium mb-3'>{item?.order?.total.formatted_with_symbol}</p>
                                </div>
                                <Link to={`/profile/orders/${item.id}`} className='w-48 h-10 flex justify-center items-center hover:text-gray-800 rounded bg-gray-100 font-medium text-s'>Sifarişin detalları</Link>
                            </div>
                        </div>
                    </TabPanel>)
            })}
        </Box>
    );
}