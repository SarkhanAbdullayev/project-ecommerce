import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    color: 'red',
    borderRadius: 4,
    boxShadow: 24,
    textAlign: 'center',
    p: 4,
};

export default function InfoModal({open, setOpen}) {

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{color:'#00D68F', marginBottom: '10px'}} id="modal-modal-title" variant="h6" component="h6">
                        Məlumatlarınız yeniləndi
                    </Typography>
                    <button className='px-14 py-2 border-2 border-green-500 rounded text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300' onClick={()=> handleClose()}>OK</button>
                </Box>
            </Modal>
        </div>
    );
}