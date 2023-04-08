import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";

import Form from "./Form";



export default function Header({ inputValue, setInputValue, onVideo }) {
  const [input, setInput] = useState("");
  

  let handleClick = (e) => {
    setInputValue(input);
  };
  return (
    <Box
      sx={{
        margin: "13px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <img src="/logo.png" alt="XFlix"></img>

      {onVideo ? null : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              fullWidth
              size="small"
              id="outlined-search"
              label="Search field"
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                border: "1px solid #444D56",
                width: "27rem",
                input: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: { color: "#606060" },
              }}
            />
            <Button
              startIcon={
                <SearchIcon sx={{ marginLeft: "10px", width: "63px" }} />
              }
              sx={{ backgroundColor: "#444D56", borderRadius: "0" }}
              onClick={(e) => handleClick(e)}
            ></Button>
          </Box>
          <Form/>
        </>
      )}
    </Box>
  );
}
