import React, { useState, useEffect } from 'react';
import {
    Section,
    Holder
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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

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
    const toast = useToast();
    const toast_id = "id"

    const [open, setOpen] = useState(false);

    const [ login, setLogin ] = useState(false);
    const [ cartCount, setCartCount ] = useState(0);

    const [dialogContent, setDialogContent] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [fetchedData, setFetchedData] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/user/login',{
            email: email, password: password
        })
        .then((res) => {
            if(res.data.response === 1){
                if(!toast.isActive(toast_id)){
                    toast({
                        id: toast_id,
                        description: "Login Successful",
                        duration: 3000,
                        position: "top-right"
                    })
                }
                setLogin(true);
                handleClose();
                setEmail("");
                setPassword("");
            } else {
                if(!toast.isActive(toast_id)){
                    toast({
                        id: toast_id,
                        description: "Incorrect Credentials. Try again",
                        duration: 3000,
                        position: "top-right"
                    })
                }
            }
        })
        .catch(err => {
            if(!toast.isActive(toast_id)){
                toast({
                    id: toast_id,
                    description: "Login Failed. Try Again",
                    duration: 3000,
                    position: "top-right"
                })
            }
        })
    }

    useEffect(() => {
        axios.post('http://localhost:3001/product/fetch')
        .then(res =>{
            setFetchedData(res.data.products);
        })
        .catch(err => {
            if(!toast.isActive(toast_id)){
                toast({
                    id: toast_id,
                    description: "Failed Fetching Data",
                    duration: 3000,
                    position: "top-right"
                })
            }
        })
    }, [toast])

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
            <Holder>
                <div style={{color: 'white'}}>
                    <Typography variant="h3">Book Store</Typography>
                    <Typography variant="h6">A Destination For All Book Lovers</Typography>
                </div>
                <Grid container>
                    {
                        fetchedData.map((element, index) => {
                            return (
                                <Grid item sm={12} md={4} lg={3} key={index}>
                                    <Paper elevation={3}>
                                        <Typography variant="h4">{element.title}</Typography>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Holder>
            <Dialog open={open} fullWidth disableEscapeKeyDown onClose={(e) => handleClose()}>
                {dialogContent === "login" ? <>
                    <DialogTitle>Login To Access Cart</DialogTitle>
                    <DialogContent >
                        <form onSubmit={handleSubmit}>
                            <TextField 
                                required
                                fullWidth
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                style={{marginBottom: '7px'}}
                            />
                            <TextField 
                                required
                                fullWidth
                                type="password"
                                label="Password"
                                placeholder="Enter the password"
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                style={{marginBottom: '7px'}}
                            />
                            <Button fullWidth type="submit" style={{backgroundColor: '#202950', color: 'white'}}>
                                Login
                            </Button>
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