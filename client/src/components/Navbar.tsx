import {AppBar, Button, CssBaseline, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Toolbar>
          <Link to="/">
            <Button>Tech Foring</Button>
          </Link>
          <Link to="/job/add">
            <Button>Create Job </Button>
          </Link>

          <Button onClick={handleLogout} color="primary" variant="outlined">
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
