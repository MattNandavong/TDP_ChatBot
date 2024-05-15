
  import { useNavigate } from 'react-router-dom'; 
  import Avatar from '@mui/material/Avatar';
  import Button from '@mui/material/Button';
  import CssBaseline from '@mui/material/CssBaseline';
  import TextField from '@mui/material/TextField';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import Checkbox from '@mui/material/Checkbox';
  import Link from '@mui/material/Link';
  import Paper from '@mui/material/Paper';
  import Box from '@mui/material/Box';
  import Grid from '@mui/material/Grid';
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
  import Typography from '@mui/material/Typography';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import React, { useState } from 'react';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import Radio from '@mui/material/Radio';
  import RadioGroup from '@mui/material/RadioGroup';
  import FormControl from '@mui/material/FormControl';
  import FormHelperText from '@mui/material/FormHelperText';
  import FormLabel from '@mui/material/FormLabel';
  import { useLocation } from 'react-router-dom';

  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import Divider from '@mui/material/Divider';
  import ListItemText from '@mui/material/ListItemText';
  import ListItemAvatar from '@mui/material/ListItemAvatar';


  import { Navigate } from 'react-router-dom';

  import useAuth from "../../hooks/useAuth"

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          BrightBoost Log
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const defaultTheme = createTheme();

  const Login = () => {


    const [question, setQuestion] = useState('');
    const [chats, setChats] = useState([{
      primary: "Razor ",
      secondary: "Hello! I am Razor. How can I help you today?",
      avatarSrc: "https://media2.giphy.com/media/6a0mBtXHlkE3uFh2Sb/giphy_s.gif?cid=6c09b952tltg0delr0ghw23drc61n5d8jt4xsebjd2wk7n4g&ep=v1_internal_gif_by_id&rid=giphy_s.gif&ct=s"
    }])
    const [currentTime, setCurrentTime] = useState('');

    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
  

    const updateQuestion = (event) => {
      event.preventDefault();
      const val = event.target.value;
      setQuestion(val);
    };

    const navigate = useNavigate();

    

    const handleSubmit = (event) => {
      getCurrentTime();
      const newQuestion = question;

       // Clear the input field after submitting
       setQuestion('');

       // Create a new chat object with the user's question
  const newChat = {
    primary: "You",
    secondary: newQuestion,
    avatarSrc: ""
  };

  setChats(prevChats => [...prevChats, newChat]);
       
      event.preventDefault();
      const loginBody = JSON.stringify({
        // StudentEmail: studentEmail,
        // StudentPassword: studentPassword,
      });


    // console.log("stydent")
    // axios({
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //   },
    //   method: 'POST',
    //   url: 'http://localhost:3200/api/users/studentLogin',
    //   data: loginBody,
    // })
    //   .then((response) => {
    //     console.log('Arrived to login request');
    //     if (response.status === 200) {
    //       setResData(response.data);
    //       console.log('this is resData status ' + resData.messageCode);
    //       if (resData.messageCode === '1000') {
    //         setLoggedin(true);
    //         window.sessionStorage.setItem("IsLoggedIn", true);
    //         window.sessionStorage.setItem("user", true);
    //         navigate('/StudentProfile', { state: { userData: resData } });
    //         //  navigate('/Dashboard')
    //         Swal.fire({
    //           position: 'middle',
    //           icon: 'success',
    //           title: 'User Login Successful !',
    //           showConfirmButton: false,
    //           timer: 3500,
    //         });
    //       }
    //       console.log('this is login status 2 ' + loggedin);
    //     }
    //   })
    //   .then(console.log(
    //     "success!"
    //   ))
    //   .catch(() => console.log('ISSUES !'));
 };

    return (
  <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100 vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://media2.giphy.com/media/6a0mBtXHlkE3uFh2Sb/giphy_s.gif?cid=6c09b952tltg0delr0ghw23drc61n5d8jt4xsebjd2wk7n4g&ep=v1_internal_gif_by_id&rid=giphy_s.gif&ct=s)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'fit',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 4   ,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: '',
              }}
            >
            
              
              <div>
      </div>         <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>


      <Paper style={{maxHeight: 450, overflow: 'auto'}}>
      <List sx=
      {{ 
        width: '100%',
        maxWidth: 500,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        height: 450,
        '& ul': { padding: 0 },
        
        
        }}>
                          {/* Map over items array to render ListItems */}
                  {chats.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={item.primary} src={item.avatarSrc} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.primary}
                          secondary={item.secondary+ "  "+currentTime}
                        />
                      </ListItem>
                      {index !== chats.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}


        
      </List>
      </Paper>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="question"
                  label="Ask your question"
                  type="text"
                  id="question"
                  onChange={updateQuestion}
                  autoComplete="current-password"
                />
                <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                Ask
                </Button>
              
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    )
  }
  export default Login