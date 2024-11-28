from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.urandom(24)

db = SQLAlchemy(app)

# Models
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(3), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.order_by(Expense.date.desc()).all()
    return jsonify([{
        'id': e.id,
        'amount': e.amount,
        'currency': e.currency,
        'category': e.category,
        'description': e.description,
        'date': e.date.isoformat()
    } for e in expenses])

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.json
    expense = Expense(
        amount=data['amount'],
        currency=data['currency'],
        category=data['category'],
        description=data.get('description', '')
    )
    db.session.add(expense)
    db.session.commit()
    return jsonify({'message': 'Expense added successfully'})

@app.route('/api/convert', methods=['GET'])
def convert_currency():
    from_currency = request.args.get('from')
    to_currency = request.args.get('to')
    amount = float(request.args.get('amount'))
    
    api_key = os.getenv('EXCHANGERATE_API_KEY')
    url = f'https://v6.exchangerate-api.com/v6/{api_key}/pair/{from_currency}/{to_currency}/{amount}'
    
    try:
        response = requests.get(url)
        data = response.json()
        return jsonify({'converted_amount': data['conversion_result']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
