import React, { Component, useEffect, useState } from "react";
import Link from "next/link";
import { withStyles } from "@mui/styles";
import { Tooltip, IconButton, Box, TextField, Icon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import urlName from "assets/Data/GlobalSearchMenuItem";
import useWindowSize from "utils/useWindowSize";

const styles = (theme) => ({
  inputBar: {
    width: "calc(100% - 40px)",
    "& .MuiInputBase-root": {
      "&:before, &:after": {
        display: "none",
      },
    },
  },
  closeIcon: {
    width: 40,
  },
});

function GlobalSearch(props) {
  const { className, classes, showSearchBar } = props;

  const size = useWindowSize();

  const [searchResult, setSearchResult] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [value, setValue] = useState("");

  function updateSearch(e) {
    setValue(e.target.value);
    if (e.target.value == "") {
      setSearchResult(false);
    } else {
      setSearchResult(true);
      let filteredMenu = urlName.data.filter(
        (menu, i) =>
          menu.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      setSearchData(() => filteredMenu);
    }
  }

  function changeSearchResult() {
    setSearchResult(false);
    setValue("");
    showSearchBar();
  }

  return (
    <div className={className}>
      <Box className={classes.inputBar}>
        <TextField
          fullWidth
          id="standard-basic"
          placeholder="Search here..."
          onChange={(e) => updateSearch(e)}
          value={value}
        />
      </Box>
      <Tooltip title="Close" placement="bottom">
        <IconButton
          className={classes.closeIcon}
          size="small"
          onClick={showSearchBar}
        >
          <CloseIcon style={{ transform: "scale(0.9)" }} />
        </IconButton>
      </Tooltip>
      {searchResult && (
        <div className="search-overlay-wrap">
          {searchData.length == 0 ? (
            <div>
              <ul>
                <li>
                  <div className="no-result-found">
                    <span>Nothing Found</span>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul>
                {searchData.map((data, i) => (
                  <li key={i}>
                    <div>
                      <Link
                        href={data.url}
                        onClick={() => changeSearchResult()}
                      >
                        {data.name}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default withStyles(styles)(GlobalSearch);
