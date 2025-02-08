import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import numpy as np
import os
from tkinter import Tk, Label, Button, messagebox
from PIL import Image, ImageTk
import mss
import mss.tools

# Загрузка обученной модели
model = load_model('heroes_detection_model.h5')

# Путь к папке с аватарами
heroes_avatars_path = 'heroes-avatars-normalized'

# Загрузка меток героев
label_map = {idx: hero for idx, hero in enumerate(os.listdir(heroes_avatars_path))}

def predict_hero(img_array):
    # Предобработка изображения
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    # Предсказание
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)[0]
    predicted_hero = label_map[predicted_class]

    return predicted_hero

def capture_screen(monitor_number):
    with mss.mss() as sct:
        # Получение информации о мониторах
        monitors = sct.monitors
        if monitor_number < 0 or monitor_number >= len(monitors):
            messagebox.showerror("Error", "Invalid monitor number")
            return None

        # Захват скриншота с указанного монитора
        monitor = monitors[monitor_number]
        screenshot = sct.grab(monitor)
        img = Image.frombytes("RGB", screenshot.size, screenshot.bgra, "raw", "BGRX")
        img.save('screenshot.png')
        return img

def open_file():
    monitor_number = 1  # Укажите номер монитора (0 для первого, 1 для второго и т.д.)
    screenshot = capture_screen(monitor_number)
    if screenshot:
        img_array = image.img_to_array(screenshot)
        predicted_hero = predict_hero(img_array)
        messagebox.showinfo("Prediction Result", f"Predicted Hero: {predicted_hero}")

# Создание графического интерфейса
root = Tk()
root.title("Hero Prediction")

Label(root, text="Capture a screenshot to predict the hero").pack(pady=10)

Button(root, text="Capture Screen", command=open_file).pack(pady=10)

root.mainloop()