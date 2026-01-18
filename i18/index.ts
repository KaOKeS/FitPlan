import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import modular translation files
import enCommon from "./locales/en/common.json";
import enIngredients from "./locales/en/ingredients.json";
import enMeals from "./locales/en/meals.json";

import plCommon from "./locales/pl/common.json";
import plIngredients from "./locales/pl/ingredients.json";
import plMeals from "./locales/pl/meals.json";

// Combine translations per language
const resources = {
  en: {
    translation: {
      ...enCommon,
      ...enIngredients,
      ...enMeals,
    },
  },
  pl: {
    translation: {
      ...plCommon,
      ...plIngredients,
      ...plMeals,
    },
  },
};

// Detect system language
const systemLanguage = getLocales()[0]?.languageCode || "en";
const detectedLanguage = systemLanguage === "pl" ? "pl" : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: detectedLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  debug: __DEV__,
});

export default i18n;
