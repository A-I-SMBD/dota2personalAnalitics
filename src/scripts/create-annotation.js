import { existsSync, writeFileSync, appendFileSync, readdir } from "fs";
import { join } from "path";

// Функция для обновления CSV файла
export default function updateCSV(filePath, heroName) {
  const csvFilePath = join("static", "heroes-avatars.annotation.csv");
  const csvLine = `${filePath},${heroName}\n`;

  // Добавляем новую строку в файл
  appendFileSync(csvFilePath, csvLine);
}

export function createAnnotationFile() {
  const csvFilePath = join("static", "heroes-avatars.annotation.csv");

  // Проверяем, существует ли файл, и если нет, создаем его с заголовком
  if (!existsSync(csvFilePath)) {
    writeFileSync(csvFilePath, "filepath,hero\n");
  }

  // Обработка всех изображений в папке
  readdir(join("static", "heroes-avatars-processed"), (err, files) => {
    if (err) {
      logger.error("Ошибка при чтении папки:", err);
      return;
    }

    files.forEach((file) => {
      var heroName = file;
      readdir(
        join("static", "heroes-avatars-processed", file),
        (err, files) => {
          if (err) {
            logger.error("Ошибка при чтении папки:", err);
            return;
          }

          files.forEach((file) => {
            const inputPath = join(
              "static",
              "heroes-avatars-processed-list",
              file
            );
            updateCSV(inputPath, heroName);
          });
        }
      );
    });
  });
}
