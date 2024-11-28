# Smart Expense Tracker

A web application for tracking expenses, categorizing them, and gaining insights into spending habits. Features include:

- Expense tracking with categories
- Currency conversion support
- Spending insights and analytics
- Responsive modern UI

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file with:
```
FLASK_APP=app.py
FLASK_ENV=development
EXCHANGERATE_API_KEY=your_api_key_here
```

4. Initialize the database:
```bash
python init_db.py
```

5. Run the application:
```bash
flask run
```

Visit http://localhost:5000 to use the application.

## Credits

This project was created using [Windsurf](https://www.codeium.com/windsurf), the world's first agentic IDE that provides a revolutionary AI Flow paradigm for software development. Powered by Codeium's advanced AI technology, Windsurf enables seamless collaboration between developers and AI to create robust, efficient applications.
