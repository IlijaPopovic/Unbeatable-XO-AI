import glagoli from "./glagoli.json";
import brojevi from "./brojevi.json";
import oznake from "./oznake.json";
import reci from "./reci.json";

export const getRandomGlagolCardData = () => {
  const randomIndex = Math.floor(Math.random() * glagoli.length);
  const randomGlagol = glagoli[randomIndex];

  const keys = Object.keys(randomGlagol).filter(
    (key) => key !== "id" && key !== "infinitiv"
  );
  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  const pitanje =
    randomKey.charAt(0).toUpperCase() +
    randomKey.slice(1) +
    " glagola: " +
    randomGlagol.infinitiv.toUpperCase();
  const odgovor = randomGlagol[randomKey].toUpperCase();

  return { pitanje, odgovor };
};

export const getRandomNumberCardData = () => {
  const randomIndex = Math.floor(Math.random() * brojevi.length);
  const randomBroj = brojevi[randomIndex];

  const pitanje = " kako se piše broj:  " + randomBroj.number;
  const odgovor = randomBroj.slovenian.toUpperCase();

  return { pitanje, odgovor };
};

export const getRandomSymbolCardData = () => {
  const randomIndex = Math.floor(Math.random() * oznake.length);
  const randomSymbol = oznake[randomIndex];

  const pitanje = " Kako se čita oznaka:  " + randomSymbol.oznaka;
  const odgovor = randomSymbol.slovenian;

  return { pitanje, odgovor };
};

export const getRandomWordCardData = () => {
  const randomIndex = Math.floor(Math.random() * reci.length);
  const randomWord = reci[randomIndex];

  const pitanje = " Kako se piše reč:  " + randomWord.prevod.toUpperCase();
  const odgovor = randomWord.slovenian.toUpperCase();

  return { pitanje, odgovor };
};
