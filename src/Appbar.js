import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import "./Appbar.css";

function Appbar() {
  return (
    <div className="appbar">
      <AppBar className="appbar__bar">
        <Toolbar>
          <Typography className="appbar__appname" variant="h6" noWrap>
            Country Capital
          </Typography>
          <div className="appbar__search">
            <div className="appbar__searchicon"></div>
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Appbar;
