import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  BookmarkBorder as BookmarkIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import axios from 'axios';

function VersePage() {
  const { book, chapter, verse } = useParams();
  const [verseData, setVerseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/verses/${book}/${chapter}/${verse}`
        );
        setVerseData(response.data);
        setError(null);
      } catch (err) {
        setError('Error loading verse');
        console.error('Error fetching verse:', err);
      }
      setLoading(false);
    };

    fetchVerse();
  }, [book, chapter, verse]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleShare = () => {
    const text = `${book} ${chapter}:${verse} - ${verseData.content}`;
    if (navigator.share) {
      navigator.share({
        title: 'Bible Verse',
        text: text,
      });
    } else {
      handleCopy(text);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {book} {chapter}:{verse}
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
            {verseData?.content}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <IconButton onClick={() => handleCopy(verseData.content)}>
              <CopyIcon />
            </IconButton>
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
            <IconButton>
              <BookmarkIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default VersePage; 