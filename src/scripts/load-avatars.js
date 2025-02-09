import { existsSync, mkdirSync, writeFileSync, appendFileSync } from "fs";
import { join } from "path";
import axios from "axios";
import jsdom from "jsdom";
import logger from "../core/logger.js";

var wikiDomain = "https://liquipedia.net";

// Папка для сохранения изображений
var downloadFolder = join("static", "heroes-avatars-origins");

async function getImagesUrlsAndHeroesNames() {
  const { data } = await axios.get(wikiDomain + "/dota2/Main_Page");
  const { document } = new jsdom.JSDOM(data).window;

  const imageUrlsAndHeroesName = Array.from(
    document.querySelectorAll("div.heroes-panel__hero-card")
  ).map((heroCard) => {
    return [
      heroCard.querySelector(".heroes-panel__hero-card__title a").title,
      wikiDomain + heroCard.querySelector("img").src,
    ];
  });

  return imageUrlsAndHeroesName;
}

// Функция для скачивания изображения
async function downloadImage(url, filename) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка при скачивании ${url}: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  writeFileSync(join(downloadFolder, filename), Buffer.from(buffer));
  logger.info(`Скачано: ${filename}`);
}

// Скачиваем все изображения
async function downloadAllImages(heroesAndUrls) {
  for (const [hero, url] of heroesAndUrls) {
    const imageName = hero + ".png";
    const imagePath = join(downloadFolder, imageName);
    if (!existsSync(imagePath)) {
      await downloadImage(url, imageName);
    }
  }
}

export default async function getDotaCharacters() {
  // Список ссылок на изображения
  const heroesAndUrls = await getImagesUrlsAndHeroesNames();

  // Создаем папку, если она не существует
  if (!existsSync(downloadFolder)) {
    mkdirSync(downloadFolder);
  }

  await downloadAllImages(heroesAndUrls);
}
