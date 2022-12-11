# Импорт библиотек

import json
from random import randint, seed
from time import time
import cv2
import numpy as np
from skimage.feature import canny
from skimage.transform import hough_line, hough_line_peaks
from skimage.transform import rotate
from skimage.color import rgb2gray
from matplotlib import pyplot as plt
import itertools
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
import tensorflow as tf


# раскодирование тензора в гос номер
def decode_batch(out):
    rus_letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'А', 'В', 'С', 'Е', 'Н', 'К', 'М', 'О', 'Р', 'Т', 'Х', 'У']
    plate_number = []
    for j in range(out.shape[0]):
        out_best = list(np.argmax(out[j, 2:], 1))
        out_best = [k for k, g in itertools.groupby(out_best)]
        outstr = ''
        for c in out_best:
            if c < len(rus_letters):
                outstr += rus_letters[c]
        plate_number.append(outstr)
    return plate_number

# получение инфы по номеру
# тут должен быть api, который пробивает номер по базам гибдд (например, узнать через гос номер vin, а далее по нему
# составить отчет и вывести)
# а пока будет рандомно выдавать надписи legit или fake 
def api_or_smth(plate_number):
    seed(time())
    outcome = ['fake', 'legit']
    rand_ind = randint(0,1)
    return {plate_number:outcome[rand_ind]}

class AutoPlateRecognizer():

    def __init__(self, content_path):
        # видео для расшифровки
        self.decode_content = cv2.VideoCapture(content_path)
        # модель для распознания номера из фото
        self.path_to_model_1 = './neuro_network_plate/Neuro_network/model_resnet.tflite'
        # модель для извлечения инфы из номера
        self.path_to_model_2 = './neuro_network_plate/Neuro_network/model1_nomer.tflite'
        # заготовка под расшифрованный номер
        self.plate_number = ''

    def recognize_number(self, save_inside = False):
        # считывание фреймов с видео
        frames = []
        count_frames = 0 # ограничение по фреймам, в будущем можно выставить, чтобы прога анализировала каждый фрейм
        # и методом большинства выбирала предсказание
        while count_frames<3:
            ret,frame = self.decode_content.read()
            if ret:
                frames.append(frame)
            else:
                break
        self.decode_content.release()
        # cv2.destroyAllWindows()
        # заготовка под финальный номер
        result = ''
        # проходимся по фреймам и пытаемся распознать номер
        for fr in frames:
            # извлекаем номер из изображения
            image_height, image_width, _ = fr.shape
            image = cv2.resize(fr, (1024,1024))
            image = image.astype(np.float32)
            interpreter = tf.lite.Interpreter(model_path=self.path_to_model_1)
            interpreter.allocate_tensors()
            input_details = interpreter.get_input_details()
            output_details = interpreter.get_output_details()
            X_data1=np.float32(image.reshape(1,1024, 1024,3))
            interpreter.set_tensor(input_details[0]['index'], X_data1)
            interpreter.invoke()
            detection = interpreter.get_tensor(output_details[0]['index'])
            img2 = cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)
            img3=fr[:,:,:]
            box_x =int(detection[0,0,0] * image_height)
            box_y = int(detection[0,0,1] * image_width)
            box_width =int(detection[0,0,2] * image_height)
            box_height = int(detection[0,0,3] * image_width)
            # если номер распознан успешно, извлекаем из картинки инфу для расшифровки
            if np.min(detection[0,0,:])>=0:
                cv2.rectangle(img2, (box_y,box_x), (box_height,box_width), (230, 230, 21), thickness=5)
                image = img3[box_x:box_width,box_y:box_height,:]
                grayscale = rgb2gray(image)
                edges = canny(grayscale, sigma=3.0)
                out, angles, distances = hough_line(edges)
                _, angles_peaks, _ = hough_line_peaks(out, angles, distances, num_peaks=20)
                angle=np.mean(np.rad2deg(angles_peaks))
                if 0 <= angle <= 90:
                    rot_angle = angle - 90
                elif -45 <= angle < 0:
                    rot_angle = angle - 90
                elif -90 <= angle < -45:
                    rot_angle = 90 + angle
                if abs(rot_angle)>20:
                    rot_angle=0
                rotated = rotate(image, rot_angle, resize=True)*255
                rotated =rotated.astype(np.uint8)
                rotated1=rotated[:,:,:]
                minus=np.abs(int(np.sin(np.radians(rot_angle))*rotated.shape[0]))
                if rotated.shape[1]/rotated.shape[0]<2 and minus >10:
                    rotated1=rotated[minus:-minus,:,:]
                lab= cv2.cvtColor(rotated1, cv2.COLOR_BGR2LAB)
                l, a, b = cv2.split(lab)
                clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
                cl = clahe.apply(l)
                limg = cv2.merge((cl,a,b))
                final = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
                interpreter = tf.lite.Interpreter(model_path=self.path_to_model_2)
                interpreter.allocate_tensors()
                input_details = interpreter.get_input_details()
                output_details = interpreter.get_output_details()
                img = final # лучше работает при плохом освещении
                img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                img = cv2.resize(img, (128,64))
                img = img.astype(np.float32)
                img /= 255
                img1=img.T
                img1.shape
                X_data1=np.float32(img1.reshape(1,128, 64,1))
                interpreter.set_tensor(input_details[0]['index'], X_data1)
                interpreter.invoke()
                net_out_value = interpreter.get_tensor(output_details[0]['index'])
                result+=''.join(decode_batch(net_out_value))
                if save_inside:
                    self.plate_number+=result
                else:
                    return result
            else: # если номер не распознан, идем к следующему кадру
                continue
        return 'не распознано'


if __name__ == '__main__':
    test_video = AutoPlateRecognizer('./neuro_network_plate/Data/video_2022-12-11_02-12-14.mp4')
    test_plate = test_video.recognize_number()
    test_result = api_or_smth(test_plate)
    if test_result!='не распознано':
        for k,v in test_result.items():
            print(f'Номер - {k}; статус - {v}')
        with open('./neuro_network_plate/Results/test.json', 'w') as f:
            json.dump(test_result, f, ensure_ascii=False)
    #     print('Результаты сохранены в json файл')
    # else:
    #     print('Провалено')