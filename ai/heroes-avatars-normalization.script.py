from PIL import Image
import numpy as np
import os

# Путь к папке с исходными изображениями
input_folder = 'heroes-avatars-origins'
# Путь к папке для сохранения нормализованных изображений
output_folder = 'heroes-avatars-normalized'

# Создаем выходную папку, если она не существует
os.makedirs(output_folder, exist_ok=True)

# Перебираем все файлы в папке
for filename in os.listdir(input_folder):
    if filename.endswith(('.png', '.jpg', '.jpeg')):  # Обрабатываем только изображения
        # Путь к исходному изображению
        image_path = os.path.join(input_folder, filename)

        # Загружаем изображение
        image = Image.open(image_path)

        # Преобразуем изображение в массив NumPy
        image_array = np.array(image)

        # Нормализация: делим на 255.0 для получения значений в диапазоне [0, 1]
        normalized_image_array = image_array / 255.0

        # Выводим размеры и типы данных для проверки
        print(f"Original shape for {filename}:", image_array.shape)
        print(f"Normalized shape for {filename}:", normalized_image_array.shape)
        print(f"Data type after normalization for {filename}:", normalized_image_array.dtype)

        # Если нужно, сохраняем нормализованное изображение (в виде uint8)
        normalized_image = (normalized_image_array * 255).astype(np.uint8)
        output_path = os.path.join(output_folder, filename)
        Image.fromarray(normalized_image).save(output_path)

print("Normalization complete.")