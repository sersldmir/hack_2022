# Импорт библиотек

import face_recognition
import cv2
import pickle
from pathlib import Path


class FaceEncoder():
    
    def __init__(self, images_path=Path().cwd()/'neuro_network_face'/'Data'/'faces_photos'):
        if images_path==Path().cwd()/'neuro_network_face'/'Data'/'faces_photos':
            self.im_path = images_path
        else:
            self.im_path = Path(images_path)
        self.encod_dict = ''
        self.names_dict = ''

    def encode(self, inside=True):
        # поиск путей к фотографиям
        path_to_images_folder = self.im_path
        images_paths = path_to_images_folder.glob('*.jpg')
        paths_names_dict = {str(image):image.stem for image in images_paths} # словарь вида: путь к картинке - название картинки
        face_encodings = []
        # кодировка фото
        for image in paths_names_dict:
            cv_image = cv2.imread(image) # чтение картинки
            rgb = cv2.cvtColor(cv_image, cv2.COLOR_BGR2RGB) # смена цветов
            boxes = face_recognition.face_locations(rgb)
            encoding = face_recognition.face_encodings(rgb, boxes)
            face_encodings.append(encoding)
        # составление словаря вида: закодированная картинка - путь
        encoding_path_dict = {path:enc for enc,path in zip(face_encodings, paths_names_dict.keys())}
        self.encod_dict = encoding_path_dict
        self.names_dict = paths_names_dict
        if not inside:
            return encoding_path_dict, paths_names_dict

    def save_outcome(self):
        with open(Path().cwd()/'neuro_network_face'/'Data'/'known_faces'/'encodings.pickle', 'wb') as f:
            pickle.dump(self.encod_dict, f)
        # сохранение словаря имен
        with open(Path().cwd()/'neuro_network_face'/'Data'/'known_faces'/'names.pickle', 'wb') as f:
            pickle.dump(self.names_dict, f)


if __name__ == '__main__':
    encoder = FaceEncoder()
    encoder.encode()
    encoder.save_outcome()
