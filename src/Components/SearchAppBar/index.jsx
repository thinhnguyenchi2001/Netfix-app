import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0",
      "&:hover": {
        cursor: "pointer",
      },
      "&:focus": {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        width: "25ch",
        cursor: "text",
      },
    },
  },
}));

export default function SearchAppBar() {
  const navigate = useNavigate();
  const SearchItems = (e) => {
    if (e.target.value) {
      if (e.key === "Enter") {
        navigate(`/search/${e.target.value}`);
        e.target.value = "";
      }
    }
  };

  return (
    <Toolbar
      style={{
        padding: "0",
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onKeyDown={(e) => SearchItems(e)}
        />
      </Search>
    </Toolbar>
  );
}
