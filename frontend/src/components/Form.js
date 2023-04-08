import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from 'axios';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {config} from '../App';


const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#121212",
  width: 400,
  bgcolor: "#3b3b3b",
  border: "1px solid #3b3b3b",
  borderRadius: "10px",
  p: 4,
  color: "#FFFFFF99",
};

export default function Form() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [showDate, setShowDate] = React.useState(true);
  const [formData, setFormData] = React.useState({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
    previewImage: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //for videolink, title, thumbnail
  let handleChange = (e) => {
    let [key, value] = [e.target.id, e.target.value];
    console.log(key, value);
    setFormData({ ...formData, [key]: value });
  };

  //for genre
  let handleGenreChange = (e) => {
    let [key, value] = ["genre", e.target.value];
    console.log(key, value);
    setFormData({ ...formData, [key]: value });
  };

  let handleAgeChange = (e) => {
    let [key, value] = ["contentRating", e.target.value];
    console.log(key, value);
    setFormData({ ...formData, [key]: value });
  };

  let handleDateChange = (e) => {
    let date = new Date(e.target.value).toUTCString();
    console.log(date);
    const dateArray = date.split(' ');
    const datestr = dateArray[1]+" "+ dateArray[2] +" "+ dateArray[3];
    let [key, value] = ['releaseDate', datestr];
    setFormData({...formData, [key]:value})
  };

  let handleSubmit = async ()=>{
    try{
    console.log(formData);
    const res = await axios.post(`${config.API_URL}/v1/videos`, formData);
    console.log(res);
    setOpen(false);
    enqueueSnackbar("Data Successfully Uploaded", {variant:"success"})
    } catch(err){
       enqueueSnackbar("Something Went Wrong!", {variant: 'error'});
    }

  }
  return (
    <>
      <Button
        variant="contained"
        size="small"
        startIcon={<FileUploadIcon />}
        onClick={handleOpen}
      >
        Upload
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="h4"
              sx={{ color: "#FFFFFFDE" }}
            >
              Upload Video
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="h4"
              sx={{ color: "#FFFFFFDE" }}
              onClick={handleClose}
            >
              X
            </Typography>
          </Box>
          <TextField
            id="videoLink"
            label="Video Link"
            value={formData.videoLink}
            type="search"
            onChange={(e) => handleChange(e)}
            fullWidth
            sx={{
              border: "1px solid #FFFFFF99",
              borderRadius: "5px",
              input: { color: "#FFFFFF99" },
            }}
            InputLabelProps={{
              style: { color: "#FFFFFF99" },
            }}
          />
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ margin: "5px 0 20px 10px" }}
          >
            This link will be used to derive the video
          </Typography>
          <TextField
            id="previewImage"
            label="Thumbnail Image Link"
            onChange={(e) => handleChange(e)}
            value={formData.previewImage}
            type="search"
            fullWidth
            sx={{
              border: "1px solid #FFFFFF99",
              borderRadius: "5px",
              input: { color: "#FFFFFF99" },
            }}
            InputLabelProps={{
              style: { color: "#FFFFFF99" },
            }}
          />
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ margin: "5px 0 20px 10px" }}
          >
            This link will be used to preview the thumbnail image
          </Typography>
          <TextField
            id="title"
            label="Title"
            type="search"
            value={formData.title}
            onChange={(e) => handleChange(e)}
            fullWidth
            sx={{
              border: "1px solid #FFFFFF99",
              borderRadius: "5px",
              input: { color: "#FFFFFF99" },
            }}
            InputLabelProps={{
              style: { color: "#FFFFFF99" },
            }}
          />
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ margin: "5px 0 20px 10px" }}
          >
            The title will be the representative text for video
          </Typography>
          <FormControl
            fullWidth
            sx={{ border: "1px solid #FFFFFF99", borderRadius: "5px" }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "#FFFFFF99" }}
            >
              Genre
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="genre"
              value={formData.genre}
              label="Genre"
              onChange={(e) => handleGenreChange(e)}
              sx={{
                ".MuiSvgIcon-root ": {
                  fill: "#FFFFFF99 !important",
                },
                ".MuiSelect-select": {
                  color: "#FFFFFF99 !important",
                },
              }}
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: "#3b3b3b",
                      color: "#FFFFFF99",
                    },
                  },
                },
              }}
            >
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Lifestyle">Lifestyle</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ margin: "5px 0 20px 10px" }}
          >
            Genre will help in categorizing your videos
          </Typography>

          <FormControl
            fullWidth
            sx={{ border: "1px solid #FFFFFF99", borderRadius: "5px" }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "#FFFFFF99" }}
            >
              Suitable age group for the clip
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="genre"
              value={formData.contentRating}
              label="Age"
              onChange={(e) => handleAgeChange(e)}
              sx={{
                ".MuiSvgIcon-root ": {
                  fill: "#FFFFFF99 !important",
                },
                ".MuiSelect-select": {
                  color: "#FFFFFF99 !important",
                },
              }}
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: "#3b3b3b",
                      color: "#FFFFFF99",
                    },
                  },
                },
              }}
            >
              <MenuItem value="7+">7+</MenuItem>
              <MenuItem value="12+">12+</MenuItem>
              <MenuItem value="16+">16+</MenuItem>
              <MenuItem value="18+">18+</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ margin: "5px 0 20px 10px" }}
          >
            This will be used to filter videos on age group suitability
          </Typography>

          <FormControl
            fullWidth
            sx={{ border: "1px solid #FFFFFF99", borderRadius: "5px" }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ color: "#FFFFFF99" }}
            >
              Release Date
            </InputLabel>
            <OutlinedInput
              id="releaseDate"
              type={showDate ? "text" : "date"}
              onFocus={() => setShowDate(false)}
              onBlur={() => setShowDate(true)}
              color="secondary"
              onChange={(e) => handleDateChange(e)}
              sx={{ input: { color: "#FFFFFF99" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    size="small"
                    sx={{ color: "#FFFFFF99" }}
                  >
                    {showDate ? <CalendarTodayIcon /> : null}
                  </IconButton>
                </InputAdornment>
              }
              label="date"
            />
          </FormControl>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ margin: "5px 0 20px 10px" }}
          >
            This will be used to sort videos
          </Typography>

          <Button sx={{ backgroundColor: "#EE1520" }} variant="contained" onClick={()=>handleSubmit()}>
            Upload Video
          </Button>
          <Button
            sx={{ color: "#FFFFFFDE", marginLeft: "10px" }}
            variant="text"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
