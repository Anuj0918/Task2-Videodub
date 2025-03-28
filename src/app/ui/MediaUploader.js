"use client"; 
import React, { useState } from 'react';
import {
  Modal,
  Title,
  Text,
  Button,
  Group,
  Box,
  Divider,
  createStyles,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconUpload } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  modalBody: {
    padding: theme.spacing.xl,
    textAlign: 'center',
  },
  uploadContainer: {
    border: `1px dashed ${theme.colors.gray[4]}`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl,
    cursor: 'pointer',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    color: theme.colors.gray[6],
  },
  bigText: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 500,
  },
  smallText: {
    color: theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
  },
  footerText: {
    color: theme.colors.gray[7],
    marginTop: theme.spacing.md,
  },
}));

export default function MediaUploader({ opened, onClose }) { 
  const { classes } = useStyles();
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      withCloseButton
      centered
      overlayOpacity={0.3}
      overlayBlur={2}
      transition="fade"
    >
      <Box className={classes.modalBody}>
        <Title order={2} mb="xs">
          Let’s make a video!
        </Title>
        <Text size="sm" color="dimmed">
          Upload files or drag them here
        </Text>

        <Dropzone
          multiple
          onDrop={handleDrop}
          accept={[
            MIME_TYPES.mp4,
            MIME_TYPES.jpeg,
            MIME_TYPES.png,
            MIME_TYPES.gif,
          ]}
          className={classes.uploadContainer}
        >
          <IconUpload className={classes.uploadIcon} />
          <Text className={classes.bigText} mt="sm">
            Upload files
          </Text>
          <Text className={classes.smallText} mt="xs">
            Choose files or drag them here
          </Text>
        </Dropzone>

        <Group position="center" mb="md">
          <Button variant="outline">Start by recording</Button>
          <Button variant="outline">Start with AI</Button>
        </Group>

        <Divider mb="md" />

        <Text className={classes.footerText}>+ Add media to this project</Text>
      </Box>
    </Modal>
  );
}