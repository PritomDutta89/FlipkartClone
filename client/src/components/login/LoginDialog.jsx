import React, {useState, useContext} from 'react';
import {Dialog, Box, TextField, Typography, Button, styled} from '@mui/material';

import {authenticatesignup,authenticateLogin} from '../../service/api';
import {DataContext} from '../../context/DataProvider';


const Component = styled(Box)(({theme}) => ({
    height: "80vh",
    width: "90vh", 
    
  }))
   

const Image = styled(Box)`
   background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
   height: 82.3%;
   width: 28%;
   padding: 45px 35px;
   & > p, & > h5{
    color: #FFFFFF;
    font-weight: 600;
   }
`
const Wrapper = styled(Box)`
   display: flex;
   flex-direction: column;
   padding: 25px 35px;
  
   flex: 1;
   & > div, & > button, & > p {
    margin-top: 20px; 
   }  
`;

const LoginButton = styled(Button)`
   text-transform: none;
   background: #FB641B;
   color: #fff;
   height: 48px;
   border-radius: 2px;
`;

const RequestOTP = styled(Button)`
   text-transform: none;
   background: #fff;
   color: #2874f0;
   height: 48px;
   border-radius: 2px;
   box-shadow:0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
    font-size: 12px;
    color: #878787;
`;

const CreateAccount = styled(Typography)`
    font-size: 14px;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    cursor: pointer;
`;

const Error = styled(Typography)`
   font-size: 10px;
   color: #ff6161;
   line-height: 0;
   margin-top: 10px;
   font-weight: 600;
`



const accountInitialValues = {
    login: {
        view: 'login',
        heading: "Login",
        subHeading: "Get access to your Orders, Wishlist and Recommendations"
    },
    signup:{
        view: 'signup',
        heading: "Looks like you're new here!",
        subHeading: "Sign up with your mobile number to get started"
    }
}

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}

const loginInitialValues = {
    username: '',
    password: ''
}

const LoginDialog = ({open, setOpen}) => {

    const [account, toggleAccount] = useState(accountInitialValues.login);

    const [signup, setSignup] = useState(signupInitialValues);

    const [login, setLogin] = useState(loginInitialValues);

    const {setAccount} = useContext(DataContext);

    const [error, setError] = useState(false);

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
      };
    //toggle between login and signup page
    const toggleSignup = ()=>{
        toggleAccount(accountInitialValues.signup)
    }
    
    const onInputChamge = (e)=>{
        //  console.log(e.target.value); //For store this value wee need to state
         //must be destructured already filled value by spread operator for pretend override
         //here we write e.target.name in square bracket bcz it is a variable, and here we use this variable as a key thats why we write this way
         setSignup({...signup, [e.target.name]: e.target.value });
        //  console.log(signup);
    }

    const signupUser = async ()=>{
       
        let response = await authenticatesignup(signup); //this is return promise bcz go api.js->se there where I write this function in async
        if(!response) return;
        handleClose();
        setAccount(signup.firstname)
    }

    const onValueChange = (e)=>{
        setLogin({...login, [e.target.name]: e.target.value })
    }

    const loginUser = async ()=>{
        let response =  await authenticateLogin(login);
        console.log(response);
        if(response.status === 200)
        {
            handleClose();
            setAccount(response.data.data.firstname);
        }
        else
        {
            setError(true);
        }
    }

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: {maxwidth: 'unset'}}}>
        <Component>
           <Box style={{display: 'flex', height: '100%'}}>
               {/* For left part */}
                  <Image>
                     <Typography variant="h5">{account.heading}</Typography>
                     <Typography style={{marginTop: '20px'}}>{account.subHeading}</Typography>
                  </Image>
              {/* For right part */}
               { account.view === 'login'?
                  <Wrapper> 
                      <TextField variant="standard" onChange={(e)=>onValueChange(e)} name='username' label="Enter Username"/>
                      { error && <Error>Please enter valid username and password</Error>}
                      <TextField variant="standard" onChange={(e)=>onValueChange(e)} name='password' label="Enter Password"/>
                      <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                      <LoginButton onClick={()=>loginUser()}>Login</LoginButton>
                      <Typography style={{textAlign: 'center'}}>OR</Typography>
                      <RequestOTP>Request OTP</RequestOTP>
                      <CreateAccount onClick={()=>toggleSignup()}>New to Flipkart? Create an account</CreateAccount>
                  </Wrapper> 
                 :
                 <Wrapper> 
                      <TextField variant="standard" name='firstname' label="Enter Firstname" onChange={(e)=>onInputChamge(e)}/>
                      <TextField variant="standard" name='lastname' label="Enter Lastname" onChange={(e)=>onInputChamge(e)}/>
                      <TextField variant="standard" name='username' label="Enter Username" onChange={(e)=>onInputChamge(e)}/>
                      <TextField variant="standard" name='email' label="Enter Email" onChange={(e)=>onInputChamge(e)}/>
                      <TextField variant="standard" name='password' label="Enter Password" onChange={(e)=>onInputChamge(e)}/>
                      <TextField variant="standard" name='phone' label="Enter Phone" onChange={(e)=>onInputChamge(e)}/>
                      <LoginButton onClick={()=> signupUser()}>Continue</LoginButton>
                  </Wrapper> 
               }
            </Box>
        </Component>
    </Dialog>
  )
}

export default LoginDialog;