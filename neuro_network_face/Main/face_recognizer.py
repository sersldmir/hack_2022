# Импорт библиотек

import face_recognition
import cv2
import pickle
from pathlib import Path
import imutils
import json


class FaceRecognizer():

    def __init__(self, video_folder_path):
        self.videos_path = video_folder_path
        with open(Path().cwd()/'neuro_network_face'/'Data'/'known_faces'/'encodings.pickle', 'rb') as f:
            self.encoding_dict = pickle.load(f)
        with open(Path().cwd()/'neuro_network_face'/'Data'/'known_faces'/'names.pickle', 'rb') as f:
            self.paths_names_dict = pickle.load(f)
        self.rec_vid = ''
        self.res = ''

    def recognize(self, inside=True):
        # открытие видео и распознование
        videos_folder_path = self.videos_path
        videos_paths = [str(i) for i in videos_folder_path.glob('*.mp4')]
        frames_encoding = []
        for path in videos_paths:
            video = cv2.VideoCapture(path)
            ret, frame = video.read()
            video.release()
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            rgb = imutils.resize(frame, width=750)
            # r = frame.shape[1] / float(rgb.shape[1])
            boxes = face_recognition.face_locations(rgb)
            encoding = face_recognition.face_encodings(rgb, boxes)
            frames_encoding.append(*encoding)
        self.rec_vid = frames_encoding
        if not inside:
            return frames_encoding

    def compare_n_match(self, inside=True):
        # заготовка для заключения
        result = []
        # список кодировок известных лиц
        known_faces = list(*self.encoding_dict.values())
        # сравнение кадра видео и известных лиц
        for encoding in self.rec_vid:
            trans_dict = {}
            matches = face_recognition.compare_faces(known_faces, encoding)
            if True in matches:
                match_index = [i for (i, b) in enumerate(matches) if b]
                trans_dict['identified'] = 'success'
                for ind_match in match_index:
                    name = self.paths_names_dict[list(self.paths_names_dict.keys())[ind_match]]
                    trans_dict['name'] = name
            else:
                trans_dict['identified'] = 'failed'
            result.append(trans_dict)
        if inside:
            self.res = result
        else:
            self.res = result
            return result

    def save_to_json(self):
        with open(Path().cwd()/'neuro_network_face'/'Results'/'outcome.json', 'w') as f:
            json.dump(self.res, f, ensure_ascii=False)

if __name__ == '__main__':
    recognizer = FaceRecognizer(Path().cwd()/'neuro_network_face'/'Data'/'incoming_video')
    recognizer.recognize()
    recognizer.compare_n_match()
    recognizer.save_to_json()