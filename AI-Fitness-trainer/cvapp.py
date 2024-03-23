from flask import Flask, request, render_template
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run_main/<string:exercise_type>', methods=['POST'])
def run_main(exercise_type):
    # exercise_type = request.form['exercise_type']
    
    # Execute main.py with the provided exercise type
    try:
        subprocess.run(['python', 'main.py', '-t', exercise_type], check=True)
        return 'Success'
    except subprocess.CalledProcessError as e:
        return f'Error: {e}', 500

if __name__ == '__main__':
    app.run(debug=True)
