import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from 'axios';
import {config} from '../App';



export default function VideoSection({videoId}) {

  const [embedVideo, setEmbedVideo] = useState("");
  let fetchVideo = async ()=>{
    console.log(window.location.pathname)
    const str = window.location.pathname;
    const strarr = str.split('/')
    let id = strarr[strarr.length-1];

    const res = await axios.get(`${config.API_URL}/v1/videos`);
    const data = res.data.videos;
    let embedVideoId = data.find((ele)=> ele._id === id);
    return embedVideoId.videoLink; 
  }

  useEffect(()=>{
   fetchVideo().then(res => setEmbedVideo(res))
  }, [videoId])
  return (
    <Box className="movie-container" sx={{ backgroundColor: "#181818" }}>
      <Grid

        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={12}>
          <iframe
            src={`https://${embedVideo}`}
            title="W3Schools Free Online Web Tutorials"
            className="videoPlayer"
            width="100%"
            height="600px"
            style={{border: "1px solid black", borderRadius:"10px"}}
          ></iframe>
        </Grid>
      </Grid>
    </Box>
  );
}
