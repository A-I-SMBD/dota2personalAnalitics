import sharp from "sharp";
import fs from "fs";
import path from "path";
import logger from "../core/logger.js";

const inputFolder = "static/heroes-avatars-origins";
const outputFolder = "static/heroes-avatars-processed";

// Функция для обработки одного изображения
const processImage = (inputPath, outputPath) => {
  sharp(inputPath)
    .toFile(outputPath + ".png", (err) => {
      if (err) {
        logger.error("Ошибка при обработке изображения:", err);
      } else {
        logger.info(
          `Изображение успешно обработано и сохранено: ${outputPath}`
        );
      }
    })
    .flip()
    .toFile(outputPath + "-flipped.png", (err) => {
      if (err) {
        logger.error("Ошибка при обработке изображения:", err);
      } else {
        logger.info(
          `Изображение успешно обработано и сохранено: ${outputPath}`
        );
      }
    })
    .flop()
    .toFile(outputPath + "-flopped.png", (err) => {
      if (err) {
        logger.error("Ошибка при обработке изображения:", err);
      } else {
        logger.info(
          `Изображение успешно обработано и сохранено: ${outputPath}`
        );
      }
    });
};

const copyImagesToListFolder = (folderPath) => {
  if (!fs.existsSync("static/heroes-avatars-processed-list")) {
    fs.mkdirSync("static/heroes-avatars-processed-list");
  }

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      logger.error("Ошибка при чтении папки:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          logger.error("Ошибка при получении информации о файле:", err);
          return;
        }

        if (stats.isDirectory()) {
          copyImagesToListFolder(filePath);
        } else if (stats.isFile() && /\.(png|jpg|jpeg|gif)$/i.test(file)) {
          const outputPath = path.join(
            "static/heroes-avatars-processed-list",
            file
          );
          fs.copyFile(filePath, outputPath, (err) => {
            if (err) {
              logger.error("Ошибка при копировании файла:", err);
            } else {
              logger.info(`Файл успешно скопирован: ${outputPath}`);
            }
          });
        }
      });
    });
  });
};

export function createTestImages() {
  fs.access(outputFolder, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(outputFolder, { recursive: true }, (err) => {
        if (err) {
          logger.error("Ошибка при создании папки:", err);
          return;
        }
        logger.info(`Папка успешно создана: ${outputFolder}`);
      });
    } else {
      logger.info(`Папка уже существует: ${outputFolder}`);
    }
  });

  // Обработка всех изображений в папке
  fs.readdir(inputFolder, (err, files) => {
    if (err) {
      logger.error("Ошибка при чтении папки:", err);
      return;
    }

    files.forEach((file) => {
      const inputPath = path.join(inputFolder, file);
      const outputHeroFolder = path.join(outputFolder, path.parse(file).name);
      const outputPath = path.join(outputHeroFolder, path.parse(file).name);

      // Проверяем, существует ли файл, и если нет, создаем его с заголовком
      if (!fs.existsSync(outputHeroFolder)) {
        fs.mkdirSync(outputHeroFolder);
      }

      fs.access(outputPath + ".png", fs.constants.F_OK, (err) => {
        if (err) {
          processImage(inputPath, outputPath);
        } else {
          logger.info(`Изображение уже существует: ${outputPath}.png`);
        }
      });
    });
  });

  copyImagesToListFolder(outputFolder);
}
