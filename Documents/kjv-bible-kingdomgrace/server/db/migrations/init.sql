-- Create tables
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    order_num INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    chapter_num INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS verses (
    id SERIAL PRIMARY KEY,
    chapter_id INTEGER REFERENCES chapters(id),
    verse_num INTEGER NOT NULL,
    content TEXT NOT NULL,
    search_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_verses_search ON verses USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS idx_books_name ON books(name);
CREATE INDEX IF NOT EXISTS idx_chapters_book_chapter ON chapters(book_id, chapter_num);
CREATE INDEX IF NOT EXISTS idx_verses_chapter_verse ON verses(chapter_id, verse_num);

-- Insert sample data (Genesis 1:1-3 as an example)
INSERT INTO books (name, order_num) VALUES ('Genesis', 1) ON CONFLICT DO NOTHING;

INSERT INTO chapters (book_id, chapter_num)
SELECT id, 1 FROM books WHERE name = 'Genesis'
ON CONFLICT DO NOTHING;

INSERT INTO verses (chapter_id, verse_num, content)
SELECT c.id, v.verse_num, v.content
FROM chapters c
CROSS JOIN (VALUES 
    (1, 'In the beginning God created the heaven and the earth.'),
    (2, 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.'),
    (3, 'And God said, Let there be light: and there was light.')
) AS v(verse_num, content)
WHERE c.book_id = (SELECT id FROM books WHERE name = 'Genesis')
AND c.chapter_num = 1
ON CONFLICT DO NOTHING; 