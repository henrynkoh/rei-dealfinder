const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const { book, chapter, verse, keyword } = req.query;
    let query = `
      SELECT b.name as book, c.chapter_num, v.verse_num, v.content
      FROM verses v
      JOIN chapters c ON v.chapter_id = c.id
      JOIN books b ON c.book_id = b.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (book) {
      query += ` AND b.name = $${paramCount}`;
      params.push(book);
      paramCount++;
    }

    if (chapter) {
      query += ` AND c.chapter_num = $${paramCount}`;
      params.push(chapter);
      paramCount++;
    }

    if (verse) {
      query += ` AND v.verse_num = $${paramCount}`;
      params.push(verse);
      paramCount++;
    }

    if (keyword) {
      query += ` AND v.content ILIKE $${paramCount}`;
      params.push(`%${keyword}%`);
      paramCount++;
    }

    query += ' ORDER BY b.order_num, c.chapter_num, v.verse_num';

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error performing search' });
  }
});

module.exports = router; 