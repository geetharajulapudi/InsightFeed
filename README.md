# **InsightFeed - News Feed Application**

### **Overview**

InsightFeed is a full-stack web application built using **React** for the frontend, **Django(DRF)** for backend and **PostgreSQL** as the database. This application allows user to view latest news articles from multiple categories in a single platform, User can browse articles by category, search relevant content, and read detailed articles with full description. It also help users to save the news articles for later reading, enhancing personalization and usability.

<img width="1889" height="960" alt="Screenshot from 2026-01-21 13-13-40" src="https://github.com/user-attachments/assets/ca3fa018-a0e3-4aba-bfa8-25abf36b8bd5" />

### **Features**

- Displays the latest news in a responsive feed layout
- Allows user to save articles to read later
- Provides a dedicated **Bookmarks** page to manage saved articles
- Read full article details from the Home page
- Supports browsing and discovering relevant articles using a search bar
- Error handling and Loading indicators for better user experience
- Reusable Feed and Card Components
- Centralized state management using Redux
- Clean and Modular project structure

<img width="1718" height="945" alt="Screenshot from 2026-01-21 14-58-23" src="https://github.com/user-attachments/assets/6b669ca4-5c81-4e3d-9939-d549d2a3ba70" />

### Tech Stack

##### Frontend
- React
- Redux Toolkit (State Management)
- JavaScript
- HTML & CSS
- Axios (API Calls)
##### Backend 
- Python
- Django
- Django Rest Framework
- PostgreSQL

### How It Works
The application is built as a full-stack system with a clear separation between the frontend and backend.
- The React frontend is responsible for rendering the user interface and handling user interactions.
- News articles are displayed using reusable components such as Feed and Card.
- Global state like articles, Bookmarks, and UI actions is managed using Redux Toolkit.
- When a user interacts with the UI to save a article or to view a bookmarked articles, the frontend sends requests to the backend using Axios.
- The Django REST Framework backend processes these requests, applies business logic, and interacts with the database.
- The backend returns structured JSON responses, which update the Redux store and re-render the UI.
#### Data Flow 
```
User clicks "Save" Button on an article
        ↓
React Card Component renders
        ↓
Dispatch Redux async thunk (saveArticleNote)
        ↓
Axios sends POST request to backend API
        ↓
Django REST API validates request data
        ↓
Article is saved in the database
        ↓
Backend returns saved article as JSON
        ↓
Redux store updates Bookmark state
        ↓
UI updates and shows saved article in Bookmarks page
```

<img width="1890" height="922" alt="Screenshot from 2026-01-21 17-16-53" src="https://github.com/user-attachments/assets/5bc8371f-95fb-421d-bf96-44bcfeae8357" />

### Project Structure
The project has a frontend built with React (components, pages, Redux, API services) and a backend built with Django REST API (models, serializers, views).
```bash
INSIGHTFEED/
│
├── backend/                         # Django backend
│   └── edu_feed/
│       ├── edu_feed/                # Django project settings
│       │   ├── __init__.py
│       │   ├── asgi.py
│       │   ├── settings.py
│       │   ├── urls.py
│       │   └── wsgi.py
│       │
│       ├── feed/                    # News feed application
│       │   ├── migrations/
│       │   ├── serializers/         # DRF serializers
│       │   ├── views/               # API views
│       │   ├── __init__.py
│       │   ├── admin.py
│       │   ├── apps.py
│       │   ├── models.py
│       │   └── tests.py
│       │
│       ├── .env                     # Backend environment variables
│       ├── env-sample               # Sample env file
│       ├── db.sqlite3               # Local database
│       ├── manage.py
│       └── requirement.txt
│
├── frontend/                        # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── api/                     # API service calls
│   │   ├── app/                     # App-level setup
│   │   ├── assets/                  # Static assets
│   │   ├── components/              # Reusable UI components
│   │   │   ├── articles/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── ExpandedCard/
│   │   │   ├── feed/
│   │   │   └── navbar/
│   │   ├── features/                # Redux slices
│   │   ├── pages/                   # Application pages
│   │   ├── utils/                   # Helper utilities
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── index.html
│   ├── eslint.config.js
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── yarn.lock
│   └── README.md
│
├── env/                             # Python virtual environment
├── .gitignore
```

### Future Enhancements
- Integrate user authentication and personalization to manage bookmarks per user.
- Add note-taking, editing, and deleting functionality for saved articles.
- Introduce pagination for better performance with large number of articles.
- Add notifications for successful save or error events.
