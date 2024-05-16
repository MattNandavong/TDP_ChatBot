import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import useAuth from '../../hooks/useAuth';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Razor Chat Bot
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Login = () => {
  const [question, setQuestion] = useState('');

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };

  const [chats, setChats] = useState([
    {
      primary: 'Razor ',
      secondary: 'Hello! I am Razor. How can I help you today?',
      avatarSrc:
        'https://media2.giphy.com/media/6a0mBtXHlkE3uFh2Sb/giphy_s.gif?cid=6c09b952tltg0delr0ghw23drc61n5d8jt4xsebjd2wk7n4g&ep=v1_internal_gif_by_id&rid=giphy_s.gif&ct=s',
      time: getCurrentTime(),
    },
  ]);

  const navigate = useNavigate();

  const updateQuestion = (event) => {
    event.preventDefault();
    const val = event.target.value;
    setQuestion(val);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuestion = question;

    // Clear the input field after submitting
    setQuestion('');

    // Create a new chat object with the user's question
    const newChat = {
      primary: 'You',
      secondary: newQuestion,
      avatarSrc: '',
      time: getCurrentTime(),
    };

    setChats((prevChats) => [...prevChats, newChat]);

    const queryBody = JSON.stringify({
      query: newQuestion,
    });

    axios({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      url: 'http://127.0.0.1:5000/query',
      data: queryBody,
    })
      .then((response) => {
        if (response.status === 200) {
          const newChat2 = {
            primary: 'Razor',
            secondary: response.data.answer,
            avatarSrc:
              'https://media2.giphy.com/media/6a0mBtXHlkE3uFh2Sb/giphy_s.gif?cid=6c09b952tltg0delr0ghw23drc61n5d8jt4xsebjd2wk7n4g&ep=v1_internal_gif_by_id&rid=giphy_s.gif&ct=s',
            time: getCurrentTime(),
          };
          setChats((prevChats) => [...prevChats, newChat2]);
        }
        else{
          const newChat2 = {
            primary: 'Razor',
            secondary: "I have no information over that",
            avatarSrc:
              'https://media2.giphy.com/media/6a0mBtXHlkE3uFh2Sb/giphy_s.gif?cid=6c09b952tltg0delr0ghw23drc61n5d8jt4xsebjd2wk7n4g&ep=v1_internal_gif_by_id&rid=giphy_s.gif&ct=s',
            time: getCurrentTime(),
          };
          setChats((prevChats) => [...prevChats, newChat2]);
        }
      })
      .catch(() => setMsg());
  };
  const setMsg =()=>{
    const newChat2 = {
      primary: 'Razor',
      secondary: "I have no information over that",
      avatarSrc:
        'https://media2.giphy.com/media/6a0mBtXHlkE3uFh2Sb/giphy_s.gif?cid=6c09b952tltg0delr0ghw23drc61n5d8jt4xsebjd2wk7n4g&ep=v1_internal_gif_by_id&rid=giphy_s.gif&ct=s',
      time: getCurrentTime(),
    };
    setChats((prevChats) => [...prevChats, newChat2]);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://media2.giphy.com/media/6a0mBtXHlkE3uFh2Sb/giphy_s.gif?cid=6c09b952tltg0delr0ghw23drc61n5d8jt4xsebjd2wk7n4g&ep=v1_internal_gif_by_id&rid=giphy_s.gif&ct=s)',
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
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: '',
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Paper style={{ maxHeight: 450, overflow: 'auto' }}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    height: 450,
                    '& ul': { padding: 0 },
                  }}
                >
                  {/* Map over items array to render ListItems */}
                  {chats.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={item.primary} src={item.avatarSrc} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.primary}
                          secondary={item.secondary + '  ' + item.time}
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
                autoComplete="current-question"
                InputLabelProps={{
                  sx: {
                    '&.Mui-focused': {
                      color: '#c94c4c', // focused label color
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#c94c4c', // focused border color
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#c94c4c', color: 'white' }}
              >
                Ask
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
