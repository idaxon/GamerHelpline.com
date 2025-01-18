from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///complaints.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Complaint model
class Complaint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    game_name = db.Column(db.String(100), nullable=False)
    developer_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    proof_file = db.Column(db.String(200), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'game_name': self.game_name,
            'developer_name': self.developer_name,
            'category': self.category,
            'description': self.description,
            'proof_file': self.proof_file,
        }

# Create the database and tables (run this once)
@app.before_first_request
def create_tables():
    db.create_all()

# Route: Home Page
@app.route('/')
def home():
    return render_template('index.html')

# Route: File a Complaint (GET: Show form, POST: Save complaint)
@app.route('/file-complaint', methods=['GET', 'POST'])
def file_complaint():
    if request.method == 'POST':
        username = request.form['username']
        game_name = request.form['game_name']
        developer_name = request.form['developer_name']
        category = request.form['category']
        description = request.form['description']
        proof_file = None

        # Handle file upload
        if 'proof_file' in request.files:
            proof = request.files['proof_file']
            if proof.filename != '':
                proof_file = os.path.join('uploads', proof.filename)
                proof.save(proof_file)

        # Save complaint to database
        new_complaint = Complaint(
            username=username,
            game_name=game_name,
            developer_name=developer_name,
            category=category,
            description=description,
            proof_file=proof_file
        )
        db.session.add(new_complaint)
        db.session.commit()
        return redirect('/browse-complaints')

    return render_template('file_complaint.html')

# Route: Browse Complaints
@app.route('/browse-complaints')
def browse_complaints():
    complaints = Complaint.query.all()
    return render_template('browse_complaints.html', complaints=complaints)

# API: Get All Complaints (JSON)
@app.route('/api/complaints')
def get_complaints():
    complaints = Complaint.query.all()
    return jsonify([c.to_dict() for c in complaints])

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
