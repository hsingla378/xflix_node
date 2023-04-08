import React, { useState } from "react";
import GenrePanel from "./GenrePanel";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import VideoPage from "./VideoPage";

export default function LandingPage({onVideoPage=false}) {
  const [selectedGenre, setSelectedGenre] = useState(["all"]);
  const [selectedAgeGroup, setAgeGroup] = useState("allAgeGroup");
  const [sortingMethod, setSortingMethod] = useState("choose");
  const [inputValue, setInputValue] = useState("");
  const [videoId, setVideoId] = useState("");

  return (
    <>
      {!onVideoPage ? (
        <>
          <Header inputValue={inputValue} setInputValue={setInputValue} />
          <GenrePanel
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedAgeGroup={selectedAgeGroup}
            setAgeGroup={setAgeGroup}
            sortingMethod={sortingMethod}
            setSortingMethod={setSortingMethod}
          />
        </>
      ) : (
        <VideoPage videoId={videoId} />
      )}
      <Dashboard
        selectedGenre={selectedGenre}
        selectedAgeGroup={selectedAgeGroup}
        sortingMethod={sortingMethod}
        inputValue={inputValue}
        setVideoId={setVideoId}
      />
    </>
  );
}
