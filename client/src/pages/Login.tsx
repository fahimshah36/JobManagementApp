import {Alert, Button, Paper, TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {Container} from "@mui/system";
import axios from "axios";
import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: any = {
      email: email,
      password: password,
    };
    console.log(body);
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const {data: res} = await axios.post(url, body);
      navigate("/");
      localStorage.setItem("token", res.data);
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSignIn}>
        <Container maxWidth="sm">
          <Grid2
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            style={{minHeight: "100vh"}}
          >
            <Paper elevation={2} sx={{padding: 5}}>
              <Grid2 container direction="column" spacing={2}>
                <h1>Sign In</h1>

                <Grid2>
                  <TextField
                    required
                    type="email"
                    fullWidth
                    label="Enter Your Email"
                    placeholder="Enter Your Email"
                    variant="outlined"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></TextField>
                </Grid2>
                <Grid2>
                  <TextField
                    required
                    type="password"
                    fullWidth
                    label="Enter Your Password"
                    placeholder="Enter Your Password"
                    variant="outlined"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></TextField>
                </Grid2>
                <Grid2>
                  <Link to="/signup">
                    <Alert severity="info">New here? Create an Account</Alert>
                  </Link>
                </Grid2>
                {error && (
                  <Grid2>
                    <Alert severity="error">{error}</Alert>
                  </Grid2>
                )}
                <Grid2>
                  <Button type="submit">Sign In</Button>
                </Grid2>
              </Grid2>
            </Paper>
          </Grid2>
        </Container>
      </form>
    </div>
  );
};

export default Login;
