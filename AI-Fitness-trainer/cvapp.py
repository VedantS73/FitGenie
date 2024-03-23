from flask import Flask, request, render_template
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run_main/<string:exercise_type>/<int:limit>', methods=['POST'])
def run_main(exercise_type,limit):
    # exercise_type = request.form['exercise_type']
    
    # Execute main.py with the provided exercise type
    try:
        print("exercise_type", exercise_type)
        print("limit", limit)
        
        subprocess.run(['python', 'main.py', '-t', exercise_type, '-c', str(limit)], check=True)
        return 'Success'
    except subprocess.CalledProcessError as e:
        return f'Error: {e}', 500

if __name__ == '__main__':
    app.run(debug=True)
