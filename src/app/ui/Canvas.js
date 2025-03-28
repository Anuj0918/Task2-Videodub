import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import styles from '../styles/Canvas.module.css';
import { Slider } from '@mantine/core';

export default function Canvas({ 
  mediaProps, 
  updateMediaProps, 
  isPlaying, 
  setIsPlaying 
}) {
  const videoRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [imageTimer, setImageTimer] = useState(0);
  const intervalRef = useRef(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      setVideoDuration(duration);
      
      if (mediaProps.endTime === 0) {
        updateMediaProps({ 
          startTime: 0,
          endTime: duration 
        });
      }
    }
  };

  useEffect(() => {
    if (isPlaying && mediaProps.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = mediaProps.startTime;
      videoRef.current.play();
    }
  }, [isPlaying, mediaProps.startTime, mediaProps.type]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setVideoTime(current);
      if (current >= mediaProps.endTime) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleStartTimeChange = (value) => {
    updateMediaProps({ 
      startTime: value
    });
  };

  const handleEndTimeChange = (value) => {
    updateMediaProps({ 
      endTime: value
    });
  };

  useEffect(() => {
    if (isPlaying && mediaProps.type !== 'video') {
      intervalRef.current = setInterval(() => {
        setImageTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setImageTimer(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, mediaProps.type]);

  const handleDragStop = (e, data) => {
    updateMediaProps({ x: data.x, y: data.y });
  };

  const resizableRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const rect = resizableRef.current.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      const newHeight = e.clientY - rect.top;
      updateMediaProps({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const isMediaVisible = () => {
    if (mediaProps.type === 'video') {
      return !!mediaProps.src;
    } else {
      return !isPlaying || (imageTimer >= mediaProps.startTime && imageTimer <= mediaProps.endTime);
    }
  };

  return (
    <div className={styles.canvas}>
      <div className={styles.timer}>
        Timer: {mediaProps.type === 'video' ? Math.floor(videoTime) : imageTimer} sec
      </div>
      {mediaProps.src && isMediaVisible() && (
        <>
          <Draggable 
            position={{ x: mediaProps.x, y: mediaProps.y }} 
            onStop={handleDragStop}
          >
            <div 
              ref={resizableRef} 
              style={{ width: mediaProps.width, height: mediaProps.height, position: 'absolute' }}
            >
              {mediaProps.type === 'video' ? (
                <video 
                  ref={videoRef}
                  src={mediaProps.src} 
                  width="100%" 
                  height="100%" 
                  controls 
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                />
              ) : (
                <img src={mediaProps.src} alt="uploaded" width="100%" height="100%" />
              )}
              <div 
                className={styles.resizeHandle} 
                onMouseDown={handleMouseDown} 
              />
            </div>
          </Draggable>

          {mediaProps.type === 'video' && videoDuration > 0 && (
            <div className={styles.timeSliderContainer}>
              <div className={styles.sliderLabel}>Start Time</div>
              <Slider
                value={mediaProps.startTime}
                onChange={handleStartTimeChange}
                min={0}
                max={mediaProps.endTime}
                step={0.1}
                label={(value) => `${value.toFixed(1)} sec`}
              />
              <div className={styles.sliderLabel}>End Time</div>
              <Slider
                value={mediaProps.endTime}
                onChange={handleEndTimeChange}
                min={mediaProps.startTime}
                max={videoDuration}
                step={0.1}
                label={(value) => `${value.toFixed(1)} sec`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}