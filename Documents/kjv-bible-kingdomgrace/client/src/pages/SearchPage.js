import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  BookmarkBorder as BookmarkIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const books = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  // Add all books of the Bible here
];

function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    book: '',
    chapter: '',
    verse: '',
    keyword: '',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/search', {
        params: searchParams,
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching verses:', error);
    }
    setLoading(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleShare = (verse) => {
    const text = `${verse.book} ${verse.chapter}:${verse.verse_num} - ${verse.content}`;
    if (navigator.share) {
      navigator.share({
        title: 'Bible Verse',
        text: text,
      });
    } else {
      handleCopy(text);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Book"
              value={searchParams.book}
              onChange={(e) => setSearchParams({ ...searchParams, book: e.target.value })}
            >
              {books.map((book) => (
                <MenuItem key={book} value={book}>
                  {book}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Chapter"
              type="number"
              value={searchParams.chapter}
              onChange={(e) => setSearchParams({ ...searchParams, chapter: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Verse"
              type="number"
              value={searchParams.verse}
              onChange={(e) => setSearchParams({ ...searchParams, verse: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Keyword"
              value={searchParams.keyword}
              onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSearch}
              disabled={loading}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {results.map((verse) => (
          <Grid item xs={12} key={`${verse.book}-${verse.chapter}-${verse.verse_num}`}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {verse.book} {verse.chapter}:{verse.verse_num}
                </Typography>
                <Typography variant="body1" paragraph>
                  {verse.content}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <IconButton onClick={() => handleCopy(verse.content)}>
                    <CopyIcon />
                  </IconButton>
                  <IconButton onClick={() => handleShare(verse)}>
                    <ShareIcon />
                  </IconButton>
                  <IconButton>
                    <BookmarkIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SearchPage; 