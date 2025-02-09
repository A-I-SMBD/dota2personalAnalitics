import tensorflow as tf
import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split

# Configuration
IMAGE_SIZE = (100, 56)
BATCH_SIZE = 32
EPOCHS = 10
NUM_CLASSES = 126  # Specify the number of your classes
CSV_PATH = 'E:/Coding/pet-projects/dota2personalAnalitics/static/heroes-avatars.annotation.csv'
IMAGES_DIR = 'E:/Coding/pet-projects/dota2personalAnalitics'
MODEL_SAVE_PATH = 'image_classifier.keras'

# Load and prepare data
def load_data(csv_path):
    df = pd.read_csv(csv_path)
    filenames = [os.path.join(IMAGES_DIR, fname) for fname in df['filepath']]
    labels = df['hero'].values

    # Convert labels to integers if they are strings
    label_map = {label: idx for idx, label in enumerate(np.unique(labels))}
    labels = np.array([label_map[label] for label in labels])

    return train_test_split(filenames, labels, test_size=0.2, random_state=42)

def parse_image(filename, label):
    image = tf.io.read_file(filename)
    image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.resize(image, IMAGE_SIZE)
    image = tf.keras.applications.resnet50.preprocess_input(image)
    return image, label

def create_dataset(filenames, labels):
    dataset = tf.data.Dataset.from_tensor_slices((filenames, labels))
    dataset = dataset.shuffle(len(filenames))
    dataset = dataset.map(parse_image, num_parallel_calls=tf.data.AUTOTUNE)
    dataset = dataset.batch(BATCH_SIZE)
    dataset = dataset.prefetch(tf.data.AUTOTUNE)
    return dataset

# Create model
def build_model():
    base_model = tf.keras.applications.ResNet50(
        include_top=False,
        weights='imagenet',
        input_shape=IMAGE_SIZE + (3,)
    )
    base_model.trainable = False  # Freeze the base model

    inputs = tf.keras.Input(shape=IMAGE_SIZE + (3,))
    x = base_model(inputs, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dense(256, activation='relu')(x)
    x = tf.keras.layers.Dropout(0.5)(x)
    outputs = tf.keras.layers.Dense(NUM_CLASSES, activation='softmax')(x)

    return tf.keras.Model(inputs, outputs)

# Main process
def main():
    # Load and prepare data
    X_train, X_val, y_train, y_val = load_data(CSV_PATH)

    train_dataset = create_dataset(X_train, y_train)
    val_dataset = create_dataset(X_val, y_val)

    # Create model
    model = build_model()

    # Compile model
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    # Train model
    history = model.fit(
        train_dataset,
        validation_data=val_dataset,
        epochs=EPOCHS
    )

    # Save model
    model.save(MODEL_SAVE_PATH)
    print(f'Model saved to {MODEL_SAVE_PATH}')

if __name__ == '__main__':
    main()