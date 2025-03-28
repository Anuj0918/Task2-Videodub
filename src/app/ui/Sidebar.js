import React, { useState } from 'react';
import { FileInput, NumberInput, Button, Text } from '@mantine/core';
import styles from '../styles/Sidebar.module.css'; 

export default function Sidebar({ mediaProps, updateMediaProps, setIsPlaying }) {
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleFileChange = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const type = file.type.startsWith('video') ? 'video' : 'image';
      updateMediaProps({ src: fileURL, type });
    }
  };

  const handleChange = (name, value) => {
    updateMediaProps({ [name]: value });
  };

  return (
    <div className={styles.Sidebar}>
      <Text weight={500} size="lg" mb="sm">Controls</Text>
      <FileInput
        key={fileInputKey}
        label="Upload Media"
        placeholder="Choose file"
        accept="video/*, image/*"
        onChange={handleFileChange}
      />
      <NumberInput
        label="Width"
        value={mediaProps.width}
        onChange={(value) => handleChange('width', value)}
        mt="sm"
      />
      <NumberInput
        label="Height"
        value={mediaProps.height}
        onChange={(value) => handleChange('height', value)}
        mt="sm"
      />
      <NumberInput
        label="Start Time (sec)"
        value={mediaProps.startTime}
        onChange={(value) => handleChange('startTime', value)}
        mt="sm"
      />
      <NumberInput
        label="End Time (sec)"
        value={mediaProps.endTime}
        onChange={(value) => handleChange('endTime', value)}
        mt="sm"
      />
      <Button fullWidth mt="md" onClick={() => setIsPlaying(true)}>
        Play
      </Button>
    </div>
  );
}