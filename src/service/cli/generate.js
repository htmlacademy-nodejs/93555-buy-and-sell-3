"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`
];
const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`
];
const CATEGORIES = [`Книги`, `Разное`, `Посуда`, `Игры`, `Животные`, `Журналы`];
const OfferType = {
  offer: `offer`,
  sale: `sale`
};
const SumRestrict = {
  min: 1000,
  max: 100000
};
const PictureRestrict = {
  min: 1,
  max: 16
};

const getPictureFileName = (number) => `item${String(number).padStart(2, `0`)}.jpg`;

const generateOffers = (count) =>
  Array(count) .fill({}) .map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max)
  }));

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;

    if (count !== undefined && isNaN(count)) {
      console.log(chalk.red(`В качестве параметра необходимо ввести число.`));
      process.exit(ExitCode.error);
    }

    const enteredCount = Number(count);
    const countOffer = enteredCount || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT) {
      console.log(chalk.red(`Не больше 1000 публикаций.`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Операция выполнена успешно. Файл создан.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Невозможно записать данные в файл.`));
      process.exit(ExitCode.error);
    }
  }
};
