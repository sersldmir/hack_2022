# Импорт библиотек

import face_recognition
import cv2
import pickle
from pathlib import Path

# поиск путей к фотографиям
path_to_images_folder = Path().cwd()/'neuro_network_face'/'Data'/'faces_photos'
print('\n')
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
# сохранение словаря кодировок
with open(Path().cwd()/'neuro_network_face'/'Data'/'known_faces'/'encodings.pickle', 'wb') as f:
    pickle.dump(encoding_path_dict, f)
# сохранение словаря имен
with open(Path().cwd()/'neuro_network_face'/'Data'/'known_faces'/'names.pickle', 'wb') as f:
    pickle.dump(paths_names_dict, f)
