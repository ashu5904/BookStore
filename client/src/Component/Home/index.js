import React, { useState } from 'react';
import {
    Section 
} from './HomeComponents.js';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
    logoStyles:{
        fontSize: '30px',
        fontFamily: 'Georgia'
    },
    nav:{
        display: 'flex',
        justifyContent:'space-between',
        width: '100%',
        flexDirection: 'row',
        padding: '10px 35px 10px 35px'
    }
}))

function Home(){
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [ login, setLogin ] = useState(false);
    const [ cartCount, setCartCount ] = useState(0);

    const [dialogContent, setDialogContent] = useState("");

    const handleOpen = (e, type) => {
        switch (type) {
            case "login":
                setOpen(true);
                setDialogContent("login")
                break;
            default:
                break;
        }
    }

    const handleClose = () => {
        setOpen(false);
        setDialogContent("");
    }

    return(
        <Section>
            <AppBar className={classes.nav}>
                <Typography variant="h6" className={classes.logoStyles}>
                    Book Store
                </Typography>
                <IconButton color="inherit" onClick={login ? null : e=> handleOpen(e, "login")}>
                    <Badge badgeContent={login ? cartCount : 0} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </AppBar>
            <Dialog open={open} fullWidth disableEscapeKeyDown onClose={(e) => handleClose()}>
                {dialogContent === "login" ? <>
                    <DialogTitle>Login To Access Cart</DialogTitle>
                    <DialogContent >
                        <form>

                        </form>
                    </DialogContent>
                </>
                : null
                }
            </Dialog>
        </Section>
    )
}

export default Home;