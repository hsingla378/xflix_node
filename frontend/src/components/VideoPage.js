import React from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
import VideoSection from './VideoSection';

export default function VideoPage({videoId}) {
  return (
    <>
     <Header onVideo/>
    <VideoSection videoId={videoId}/>
    {/* <Dashboard/> */}
    </>
  )
}
