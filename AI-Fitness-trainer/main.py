import cv2
import argparse
from utils import *
import mediapipe as mp
from body_part_angle import BodyPartAngle
from types_of_exercise import TypeOfExercise


ap = argparse.ArgumentParser()
ap.add_argument("-t",
                "--exercise_type",
                type=str,
                help='Type of activity to do',
                required=True)
ap.add_argument("-vs",
                "--video_source",
                type=str,
                help='Type of activity to do',
                required=False)
ap.add_argument("-c",
                "--counter",
                type=int,
                help='Number of times to do the exercise',
                required=False)
args = vars(ap.parse_args())


mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

counter_limit = args["counter"]  # number of times to do the exercise


# if args["video_source"] is not None:
#     cap = cv2.VideoCapture("Exercise Videos/" + args["video_source"])
# else:
#     cap = cv2.VideoCapture(0)  # webcam
cap = cv2.VideoCapture(0)

cap.set(3, 1600)  # width
cap.set(4, 960)  # height

# setup mediapipe
with mp_pose.Pose(min_detection_confidence=0.5,
                  min_tracking_confidence=0.5) as pose:

    counter = 0  # movement of exercise
    status = True  # state of move
    while cap.isOpened():
        ret, frame = cap.read()
        # result_screen = np.zeros((250, 400, 3), np.uint8)

        frame = cv2.resize(frame, (800, 480), interpolation=cv2.INTER_AREA)
        # recolor frame to RGB
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame.flags.writeable = False
        # make detection
        results = pose.process(frame)
        # recolor back to BGR
        frame.flags.writeable = True
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        try:
            landmarks = results.pose_landmarks.landmark
            counter, status = TypeOfExercise(landmarks).calculate_exercise(
                args["exercise_type"], counter, status)
        except:
            pass

        if counter >= counter_limit+1:
            frame = cv2.putText(frame, "Exercise Completed",
                    (200, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
            frame = cv2.putText(frame, "Press 'q' to exit",
                    (200, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
            cv2.imshow('Video', frame)
            key = cv2.waitKey(1)
            if key == ord('q') or key == 27:  # 'q' or ESC key to exit
                break
        else:
            frame = score_table(args["exercise_type"], frame, counter, status)

            # render detections (for landmarks)
            mp_drawing.draw_landmarks(
                frame,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(255, 255, 255),
                                    thickness=2,
                                    circle_radius=2),
                mp_drawing.DrawingSpec(color=(174, 139, 45),
                                    thickness=2,
                                    circle_radius=2),
            )

            cv2.imshow('Video', frame)
            key = cv2.waitKey(1)
            if key == ord('q') or key == 27:  # 'q' or ESC key to exit
                break

    cap.release()
    cv2.destroyAllWindows()
