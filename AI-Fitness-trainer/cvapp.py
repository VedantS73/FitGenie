from flask import Flask, render_template, Response, request
import cv2
import mediapipe as mp
from body_part_angle import BodyPartAngle
from utils import *
from werkzeug.urls import url_quote_plus

app = Flask(__name__)

# Function to process video frames
def process_frame(exercise_type, video_source):
    mp_pose = mp.solutions.pose
    mp_drawing = mp.solutions.drawing_utils

    # Open video capture
    cap = cv2.VideoCapture(video_source)

    # Setup mediapipe
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        counter = 0
        status = True

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            frame = cv2.resize(frame, (800, 480), interpolation=cv2.INTER_AREA)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame.flags.writeable = False
            results = pose.process(frame)
            frame.flags.writeable = True
            frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

            try:
                landmarks = results.pose_landmarks.landmark
                counter, status = TypeOfExercise(landmarks).calculate_exercise(exercise_type, counter, status)
            except:
                pass

            frame = score_table(exercise_type, frame, counter, status)

            # Draw landmarks
            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                       mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2),
                                       mp_drawing.DrawingSpec(color=(174, 139, 45), thickness=2, circle_radius=2))

            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    exercise_type = request.args.get('exercise_type')
    video_source = request.args.get('video_source')

    return Response(process_frame(exercise_type, video_source),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True)
