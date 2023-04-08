import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useSnackbar, SnackbarProvider } from "notistack";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import axios from "axios";
import "./Dashboard.css";
import {config} from '../App';

// const API_URL = `https://5decb229-1601-49ce-b144-353bcf14db63.mock.pstmn.io`;

export default function Dashboard({
  selectedGenre,
  selectedAgeGroup,
  sortingMethod,
  inputValue,
  setVideoId,
}) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();
  let fetchDataFromAPI = async () => {
    let arr1 = selectedGenre;
    arr1.sort();

    let url = `${config.API_URL}/v1/videos?genres=`;
    arr1.forEach((ele, i, arr) => {
      let queryParam = ele[0].toUpperCase() + ele.slice(1);
      if (i === 0) {
        url += queryParam;
      } else {
        url += `,${queryParam}`;
      }
    });
    console.log(selectedAgeGroup);
    if (selectedAgeGroup !== "allAgeGroup") {
      if (selectedGenre[0] !== "all") {
        url = `
         ${config.API_URL}/v1/videos?title=top&genres=`;
        let genre = selectedGenre;
        genre.forEach((ele, i, arr) => {
          let queryParam = ele[0].toUpperCase() + ele.slice(1);
          if (i === 0) {
            url += queryParam;
          } else {
            url += `,${queryParam}`;
          }
        });

        url += "&contentRating=";
        console.log(selectedAgeGroup);
        if (selectedAgeGroup === "twelvePlus") url += "12%2B";
        if (selectedAgeGroup === "sevenPlus") url += "7%2B";
        if (selectedAgeGroup === "sixteenPlus") url += "16%2B";
        if (selectedAgeGroup === "eighteenPlus") url += "18%2B";
      } else {
        url = `${config.API_URL}/v1/videos?contentRating=`;
        if (selectedAgeGroup === "twelvePlus") url += "12%2B";
        if (selectedAgeGroup === "sevenPlus") url += "7%2B";
        if (selectedAgeGroup === "sixteenPlus") url += "16%2B";
        if (selectedAgeGroup === "eighteenPlus") url += "18%2B";
      }
    }

    console.log(sortingMethod);
    if (sortingMethod !== "choose") {
      url = `${config.API_URL}/v1/videos?sortBy=${sortingMethod}`;
    }
    console.log(url);
    const res = await axios.get(url);
    filteredData.splice(0, filteredData.length);
    filteredData.push(...res.data.videos);
    console.log(filteredData);
    console.log(res.data.videos);
    setData(res.data.videos);
    setFilteredData([...res.data.videos]);
  };

  let handleSearch = () => {
    console.log(inputValue);
    if (!inputValue.length) {
      setFilteredData([...data]);
      // enqueueSnackbar('Displaying All results', {variant:"success"})
    }
    let newArr = data.filter((ele) => {
      return ele.title.includes(inputValue);
    });

    if (newArr.length > 0) setFilteredData([...newArr]);
    else {
      setFilteredData([...data]);
      // enqueueSnackbar('Search yielded no result!', {variant:"error"})
    }
  };

  useEffect(() => {
    handleSearch();
  }, [inputValue]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    fetchDataFromAPI();
  }, [selectedGenre, selectedAgeGroup, sortingMethod]);

  // useEffect(()=>{
  //   fetchDataFromAPI();
  // }, [selectedGenre])

  function timeSince(releaseDate) {
    const date = new Date(releaseDate);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    // console.log(formattedDate); // Output: "01/18/2022"

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  let handleClick = (videoId) => {
    // console.log(videoId)
    setVideoId(videoId);
    history.push(`/video/${videoId}`)
    // setVideoPage(true);
    // setVideoLink(video);
  };

  return (
    <Box className="movie-container" sx={{ backgroundColor: "#181818" }}>
      <Grid
        sx={{ marginTop: "30px" }}
        container
        spacing={2}
        justifyContent="space-evenly"
      >
        {filteredData.length
          ? filteredData.map((ele) => {
              return (
                <Grid item xs={6} lg={3} key={ele._id}>
                  <Card sx={{ maxWidth: 300, backgroundColor: "#181818" }}>
                    <CardActionArea onClick={()=>handleClick(ele._id)}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={ele.previewImage}
                        alt="green iguana"
                      />
                      <CardContent
                        sx={{ backgroundColor: "#181818", color: "white" }}
                      >
                        {/* <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography> */}
                        <Typography variant="body2" color="white">
                          {ele.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          color="#D1D5DA"
                        >
                          {timeSince(ele.releaseDate)} ago
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })
          : null}
      </Grid>
      <SnackbarProvider />
    </Box>
  );
}
