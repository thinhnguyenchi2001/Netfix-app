import * as React from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setCurrentUser, setSessin_id } from "../../Store/index";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Logout = () => {
    handleCloseUserMenu();
    dispatch(setSessin_id(null));
    dispatch(setToken(null));
    dispatch(setCurrentUser(null));
    localStorage.removeItem("userToken");
    navigate("/register");
  };

  return (
    <Toolbar disableGutters>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              style={{ borderRadius: "2px" }}
              variant="square"
              src="/static/images/avatar/2.jpg"
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">setting</Typography>
          </MenuItem>
          <MenuItem onClick={Logout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
}
export default ResponsiveAppBar;
