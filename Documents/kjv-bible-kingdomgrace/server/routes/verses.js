const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get verses by book and chapter
router.get('/:book/:chapter', async (req, res) => {
  try {
    const { book, chapter } = req.params;
    const result = await db.query(
      `SELECT v.verse_num, v.content 
       FROM verses v
       JOIN chapters c ON v.chapter_id = c.id
       JOIN books b ON c.book_id = b.id
       WHERE b.name = $1 AND c.chapter_num = $2
       ORDER BY v.verse_num`,
      [book, chapter]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching verses' });
  }
});

// Get specific verse
router.get('/:book/:chapter/:verse', async (req, res) => {
  try {
    const { book, chapter, verse } = req.params;
    const result = await db.query(
      `SELECT v.verse_num, v.content 
       FROM verses v
       JOIN chapters c ON v.chapter_id = c.id
       JOIN books b ON c.book_id = b.id
       WHERE b.name = $1 AND c.chapter_num = $2 AND v.verse_num = $3`,
      [book, chapter, verse]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Verse not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching verse' });
  }
});

module.exports = router; 