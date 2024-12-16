import React from "react";
import { useTranslation } from "react-i18next";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";

import { getLangColor, CurrentLangColor } from "../fun/langColor";

export default function LangMenu() {
    const { i18n } = useTranslation();
    const t = i18n.t;
    const changeLanguage = (lng) => i18n.changeLanguage(lng);
    const [showDropdown, setShowDropdown] = React.useState(false);

    function DropItem(langname, lng) {
        const langColor = getLangColor(lng);
        return (
            <button
                key={langname}
                style={styles.dropdownItem}
                onClick={() => changeLanguage(lng)}
            >
                {langname}
                <div style={styles.seletedUnderline}>
                <div style={{ ...styles.seletedUnderline, backgroundColor: langColor, width: i18n.language === lng ? '100%' : 0 }} />
                </div>
            </button>
        );
    }

    return (
        <div style={{ ...styles.langButtonContainer, width: showDropdown? 90 : 70}}>
            <div style={styles.dropdownStripContainer}>
                <div style={{ ...styles.dropdownStripContainer, backgroundColor: CurrentLangColor()}}>
                    <button style={styles.dropdownSwitch} onClick={() => setShowDropdown(!showDropdown)} aria-label={t("languages.language")}>
                        <span
                            style={{
                                marginLeft: 5,
                                color: 'white',
                                marginTop: showDropdown ? 0 : 5,
                                display: 'inline-block',
                                transition: 'transform 0.3s ease',
                                transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                        >
                            {showDropdown ? <FaAngleDown /> : <FaAngleRight />}
                        </span>
                        <span style={{ color: 'white', marginTop: 5, fontSize: 20 }}> <MdLanguage /></span>
                    </button>
                </div>
            </div>
            {showDropdown && (
                <div style={styles.dropdownContainer}>
                    {DropItem("Català", "ca")}
                    {DropItem("English", "en")}
                </div>
            )}
        </div>
    );
}

const styles = {
    langButtonContainer: {
        width: 70,
        alignItems: 'top',
        justifyContent: 'center',
        flexDirection: 'column',
        display: 'flex',
        transition: 'width 0.3s ease',
      },
    dropdownStripContainer: {
        transition: 'background-color 0.3s ease',
        backgroundColor: '#1F1F1F',
        paddingLeft:10,
    },
    dropdownSwitch: {
        width: '100%',
        height: 40,
        borderRadius: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        // borderColor: '#F07633',
        borderWidth: 0,
        backgroundColor: '#1F1F1F',
        padding: 3,
        transition: 'transform 0.3s ease',
        fontFamily: 'Helvetica, sans-serif',
        fontSize: 14,
      },
    dropdownContainer:{
        paddingLeft: 30,
        justifyContent: 'left',
    },
    dropdownItem: {
        width: '100%',
        height: 30,
        borderWidth: 0,
        backgroundColor: '#fff',
        // borderColor: '#F07633',
        alignItems: 'center',
        justifyContent: 'left',
        padding: 0,
        fontFamily: 'Helvetica, sans-serif',
        fontSize: 12,
        textAlign: 'left',
    },
    seletedUnderline: {
        backgroundColor: '#757575',
        height: 2,
        transition: 'width 0.3s ease'
    }
};
