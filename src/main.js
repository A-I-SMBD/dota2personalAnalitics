import logger from "./core/logger.js";
import { createAnnotationFile } from "./scripts/create-annotation.js";
import { createTestImages } from "./scripts/creating-testing-images.js";
import getDotaCharacters from "./scripts/load-avatars.js";

// Запускаем скачивание
await getDotaCharacters().then(() => {
  logger.info("Все изображения скачаны и сохранены.");
});
createTestImages();
createAnnotationFile();
