import { useTranslation } from "react-i18next";
import langTable from '../locales/langTable.json';

export function getLangColor(lng) {
    return langTable[lng] || 'white';
}

export function CurrentLangColor() {
    const { i18n } = useTranslation();
    const currentLangColor = getLangColor(i18n.language);

    return currentLangColor;
}
