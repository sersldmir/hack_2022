# Импорт библиотек

import face_recognition
import cv2
import pickle
from pathlib import Path
import imutils
import json


# открытие словаря кодировок
with open(Path().cwd()/'neuro_network_face'/'Data'/'known_faces'/'encodings.pickle', 'rb') as f:
    encoding_path_dict = pickle.load(f)
# открытие словаря имен
with open(Path().cwd()/'neuro_network_face'/'Data'/'known_faces'/'names.pickle', 'rb') as f:
    paths_names_dict = pickle.load(f)

# открытие видео и распознование
videos_folder_path = Path().cwd()/'neuro_network_face'/'Data'/'incoming_video'
videos_paths = [str(i) for i in videos_folder_path.glob('*.mp4')]
frames_encoding = []
for path in videos_paths:
    video = cv2.VideoCapture(path)
    ret, frame = video.read()
    video.release()
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    rgb = imutils.resize(frame, width=750)
    r = frame.shape[1] / float(rgb.shape[1])
    boxes = face_recognition.face_locations(rgb)
    encoding = face_recognition.face_encodings(rgb, boxes)
    frames_encoding.append(*encoding)

# заготовка для заключения
result = []
# список кодировок известных лиц
known_faces = list(*encoding_path_dict.values())

# сравнение кадра видео и известных лиц
for encoding in frames_encoding:
    trans_dict = {}
    matches = face_recognition.compare_faces(known_faces, encoding)
    if True in matches:
        match_index = [i for (i, b) in enumerate(matches) if b]
        trans_dict['identified'] = 'success'
        for ind_match in match_index:
            name = paths_names_dict[list(paths_names_dict.keys())[ind_match]]
            trans_dict['name'] = name
    else:
        trans_dict['identified'] = 'failed'
    result.append(trans_dict)

print(result)

with open(Path().cwd()/'neuro_network_face'/'Results'/'outcome.json', 'w') as f:
    json.dump(result, f, ensure_ascii=False)