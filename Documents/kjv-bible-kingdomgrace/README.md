# KJV Bible Verse Separator

A web application for searching and viewing Bible verses from the King James Version (KJV) Bible.

## Features

- Search verses by book, chapter, verse, or keyword
- View individual verses with proper formatting
- Copy verses to clipboard
- Share verses via social media or messaging
- Bookmark favorite verses
- Responsive design for both desktop and mobile

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd kjv-bible-verse-separator
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up the database:
```bash
# Create a PostgreSQL database named 'kjv_bible'
createdb kjv_bible

# Run the database migrations
psql -d kjv_bible -f server/db/migrations/init.sql
```

4. Create a .env file in the root directory:
```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/kjv_bible
CLIENT_URL=http://localhost:3000
```

5. Start the development servers:
```bash
# Start both frontend and backend servers
npm run dev:full
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
kjv-bible-verse-separator/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main application component
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── routes/           # API routes
│   └── db/               # Database related files
├── docs/                  # Documentation
└── package.json          # Project dependencies
```

## API Endpoints

- `GET /api/search` - Search verses
- `GET /api/verses/:book/:chapter` - Get all verses in a chapter
- `GET /api/verses/:book/:chapter/:verse` - Get a specific verse

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 