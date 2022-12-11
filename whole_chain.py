import neuro_network_face.Main.face_encoder as face_enc
import neuro_network_face.Main.face_recognizer as face_rec
import neuro_network_plate.Main.neuro_plate as neuro_plate
import sys

if len(sys.argv) > 1:
    test_plates = neuro_plate.AutoPlateRecognizer(sys.argv[1])
    test_plates.recognize_number()
    test_plates.api_or_smth()
    test_plates.save_outcome(sys.argv[4]+"/"+"plates_outcome.json")
    encoder = face_enc.FaceEncoder(sys.argv[2])
    encoder.encode()
    encoder.save_outcome()
    recognizer = face_rec.FaceRecognizer(sys.argv[3])
    recognizer.recognize()
    recognizer.compare_n_match()
    recognizer.save_to_json(sys.argv[4]+"/"+"faces_outcome.json")
else:
    test_plates = neuro_plate.AutoPlateRecognizer()
    test_plates.recognize_number()
    test_plates.api_or_smth()
    test_plates.save_outcome()
    encoder = face_enc.FaceEncoder()
    encoder.encode()
    encoder.save_outcome()
    recognizer = face_rec.FaceRecognizer()
    recognizer.recognize()
    recognizer.compare_n_match()
    recognizer.save_to_json()

