# KJV Bible Verse Separation System Design

## 1. System Architecture Overview

### 1.1 High-Level Architecture
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │     │    API      │     │  Database   │
│  (Browser)  │◄───►│   Server    │◄───►│  (PostgreSQL)│
└─────────────┘     └─────────────┘     └─────────────┘
```

### 1.2 Component Description
- **Client**: React-based web application
- **API Server**: Node.js/Express backend
- **Database**: PostgreSQL with full-text search capabilities

## 2. Data Flow

### 2.1 Search Flow
1. User enters search criteria (book, chapter, verse, or keyword)
2. Client sends request to API server
3. API server processes request and queries database
4. Database returns matching verses
5. API server formats response
6. Client displays results to user

### 2.2 Verse Display Flow
1. User selects a verse or range of verses
2. System retrieves verse data
3. Client formats and displays verses with proper separation
4. User can interact with displayed verses (copy, share, bookmark)

## 3. Database Schema

### 3.1 Main Tables
```sql
-- Books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    order_num INTEGER
);

-- Chapters table
CREATE TABLE chapters (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    chapter_num INTEGER
);

-- Verses table
CREATE TABLE verses (
    id SERIAL PRIMARY KEY,
    chapter_id INTEGER REFERENCES chapters(id),
    verse_num INTEGER,
    content TEXT,
    search_vector tsvector
);
```

## 4. API Endpoints

### 4.1 Search Endpoints
```
GET /api/search
  - Query parameters:
    - book: string
    - chapter: number
    - verse: number
    - keyword: string
  - Returns: Array of matching verses

GET /api/verses/:book/:chapter
  - Returns: All verses in specified chapter

GET /api/verses/:book/:chapter/:verse
  - Returns: Specific verse
```

### 4.2 User Features Endpoints
```
POST /api/bookmarks
  - Body: { verseId: number }
  - Creates bookmark

GET /api/bookmarks
  - Returns: User's bookmarked verses

POST /api/history
  - Body: { searchQuery: string }
  - Saves search history
```

## 5. User Interface Design

### 5.1 Main Components
1. **Search Bar**
   - Book dropdown
   - Chapter input
   - Verse input
   - Keyword search field

2. **Results Display**
   - Verse list with clear separation
   - Verse numbers
   - Copy button
   - Share button
   - Bookmark button

3. **Navigation**
   - Book selection
   - Chapter navigation
   - Quick jump to verse

### 5.2 Example Layout
```
┌─────────────────────────────────────────┐
│ Search: [Book ▼] [Chapter] [Verse]      │
│         [Keyword Search...] [Search]    │
├─────────────────────────────────────────┤
│ John 3:16                               │
│ For God so loved the world...           │
│ [Copy] [Share] [Bookmark]               │
├─────────────────────────────────────────┤
│ John 3:17                               │
│ For God sent not his Son...             │
│ [Copy] [Share] [Bookmark]               │
└─────────────────────────────────────────┘
```

## 6. Performance Optimization

### 6.1 Caching Strategy
- Redis cache for frequently accessed verses
- Browser caching for static assets
- API response caching

### 6.2 Search Optimization
- Full-text search indexing
- Query optimization
- Pagination for large result sets

## 7. Security Measures

### 7.1 Data Protection
- HTTPS encryption
- Input validation
- SQL injection prevention
- XSS protection

### 7.2 Rate Limiting
- API request limiting
- Search query throttling

## 8. Deployment Architecture

### 8.1 Production Environment
```
┌─────────────┐     ┌─────────────┐
│   CDN       │     │  Load       │
│  (Static)   │     │  Balancer   │
└─────────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │   API       │
                    │  Servers    │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │  Database   │
                    │  Cluster    │
                    └─────────────┘
```

## 9. Monitoring and Logging

### 9.1 Key Metrics
- Response times
- Error rates
- Search performance
- User engagement

### 9.2 Logging Strategy
- Request logging
- Error logging
- Performance monitoring
- User activity tracking

## 10. Future Scalability

### 10.1 Horizontal Scaling
- Multiple API servers
- Database replication
- CDN expansion

### 10.2 Feature Expansion
- User accounts
- Multiple Bible versions
- Mobile app development
- API for third-party integration 