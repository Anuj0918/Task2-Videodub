"use client";
import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import Canvas from './ui/Canvas';
import styles from './styles/Homepage.module.css';
import Sidebar from './ui/Sidebar';

export default function Home() {
  const [mediaProps, setMediaProps] = useState({
    src: '',
    type: '',
    width: 400,
    height: 200,
    startTime: 0,
    endTime: 10,
    x: 50,
    y: 50,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const updateMediaProps = (newProps) => {
    setMediaProps((prev) => ({ ...prev, ...newProps }));
  };

  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <div className={styles.container}>
        <Sidebar
          mediaProps={mediaProps} 
          updateMediaProps={updateMediaProps} 
          setIsPlaying={setIsPlaying} 
        />
        <Canvas 
          mediaProps={mediaProps} 
          updateMediaProps={updateMediaProps} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
        />
      </div>
    </MantineProvider>
  );
} 