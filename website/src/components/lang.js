import React from "react";
import { useTranslation } from "react-i18next";

export default function LangButton() {
    const { i18n } = useTranslation();
    const changeLanguage = (lng) => i18n.changeLanguage(lng);
    return (
        <div>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('ca')}>CA</button>
        </div>
    );
}
