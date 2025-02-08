import tensorflow as tf
from tensorflow.keras import layers, models
import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Paths to CSV file and folder with avatars
csv_file_path = 'heroes-avatars.annotation.csv'
heroes_avatars_path = 'heroes-avatars-normalized'

# Load data from CSV file
data = pd.read_csv(csv_file_path, header=None, names=['image_path', 'hero_name'])

# Count the number of unique heroes
num_classes = data['hero_name'].nunique()
print(f"Number of unique heroes: {num_classes}")

# Convert labels to numerical values
label_map = {hero: idx for idx, hero in enumerate(data['hero_name'].unique())}
data['label'] = data['hero_name'].map(label_map)

# Split data into training and testing sets with stratification
train_data, test_data = train_test_split(
    data,
    test_size=0.2,
    random_state=42,
    stratify=data['label']  # Добавляем стратификацию
)

# Create data generators
train_datagen = ImageDataGenerator(rescale=1./255)
test_datagen = ImageDataGenerator(rescale=1./255)

# Убираем преобразование обратно в hero_name! Оставляем числовые метки
# Генераторы будут автоматически преобразовывать их в one-hot encoding

# Create generators
train_generator = train_datagen.flow_from_dataframe(
    dataframe=train_data,
    directory=heroes_avatars_path,
    x_col='image_path',
    y_col='label',  # Теперь используем числовые метки
    target_size=(110, 62),
    batch_size=32,
    class_mode='categorical'  # Автоматически создаст one-hot encoding
)

test_generator = test_datagen.flow_from_dataframe(
    dataframe=test_data,
    directory=heroes_avatars_path,
    x_col='image_path',
    y_col='label',  # Теперь используем числовые метки
    target_size=(110, 62),
    batch_size=32,
    class_mode='categorical'
)

# Проверяем количество классов обнаруженных генераторами
print(f"Train classes: {train_generator.num_classes}")
print(f"Test classes: {test_generator.num_classes}")

# Убедимся что количество классов совпадает с ожидаемым
assert train_generator.num_classes == num_classes, "Количество классов в train не совпадает!"
assert test_generator.num_classes == num_classes, "Количество классов в test не совпадает!"

# Create the model
model = models.Sequential()
model.add(layers.Input(shape=(110, 62, 3)))  # Явно задаем Input слой
model.add(layers.Conv2D(32, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(128, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Flatten())
model.add(layers.Dense(128, activation='relu'))
model.add(layers.Dense(num_classes, activation='softmax'))

model.compile(optimizer='adam', 
              loss='categorical_crossentropy', 
              metrics=['accuracy'])

# Train the model
history = model.fit(
    train_generator,
    epochs=10,
    validation_data=test_generator
)

# Save the model
model.save('heroes_detection_model.h5')