import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setToken, setCurrentUser, setSessin_id } from "../../Store/index";
import { httpClient } from "../../httpClient.ts";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";

export default function PositionedSnackbar({ title }) {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.app.token);
  const dispatch = useDispatch();
  const { vertical, horizontal, open } = state;
  const [mess, setMess] = useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => () => {
    setMess("Please authenticate the user for authorization !");

    userToken &&
      window.open(`https://www.themoviedb.org/authenticate/${userToken}`);
    setState({ open: true, vertical: "top", horizontal: "right" });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const SuccessClick = () => {
    setState({ open: true, vertical: "top", horizontal: "right" });
    setMess("Success");
  };

  const Confirm = () => {
    setTimeout(() => {
      httpClient
        .post("/authentication/session/new", {
          request_token: userToken,
        })
        .then((response) => {
          dispatch(setSessin_id(response.data.session_id));
          navigate("/");
        })
        .catch(handleClick());
    }, 1000);
  };

  const buttons = (
    <React.Fragment>
      {title == "Send" ? (
        <span onClick={SuccessClick}>{title}</span>
      ) : (
        <Button onClick={Confirm}>{title}</Button>
      )}
    </React.Fragment>
  );

  return (
    <div>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        open={open}
        autoHideDuration={6000}
      >
        {title == "Send" ? (
          <Alert severity={"success"} sx={{ width: "100%" }}>
            {mess}
          </Alert>
        ) : (
          <Alert severity={"warning"} sx={{ width: "100%" }}>
            {mess}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
