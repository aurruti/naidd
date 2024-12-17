import React, { useState, useEffect } from "react";
import "./LangMenu.css";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";

import { getLangColor, CurrentLangColor } from "../fun/langColor";

function DropItem(langname, lng) {
    const { i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };
    
    const langColor = getLangColor(lng);
    const [hover, setHover] = useState(false);

    return (
        <button
            key={langname}
            style={styles.dropdownItem}
            onClick={() => changeLanguage(lng)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {langname}
            <div style={styles.seletedUnderline}>
            <div style={{ ...styles.seletedUnderline, backgroundColor: langColor, 
                width: i18n.language === lng || hover ? '100%' : 0 }}/>
            
            </div>
        </button>
    );
}


export default function LangMenu() {
    const { i18n } = useTranslation();
    const t = i18n.t;
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuHover, setMenuHover] = useState(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('i18nextLng');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    useEffect(() => {
        if (!menuHover) {
            const timer = setTimeout(() => {
                setShowDropdown(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [menuHover]);

    return (
        <div style={{ ...styles.langButtonContainer, width: showDropdown ? 160 : 75}}
            onMouseEnter={() => setMenuHover(true)}
            onMouseLeave={() => setMenuHover(false)}
        >
            <div style={styles.dropdownStripContainer}>
                <div style={{ ...styles.dropdownStripContainer, backgroundColor: CurrentLangColor()}}>
                    <motion.div
                        animate={{ x: 0, width: '100%' }}
                        whileHover={showDropdown ? {} : {
                            x: [0, 10, 0],
                            width: ["100%", "120%", "100%"],
                            transition: { 
                                x: { 
                                duration: 1, 
                                repeat: Infinity, 
                                repeatType: "loop",
                                ease: "easeIn"
                                },
                                width: { 
                                duration: 1, 
                                repeat: Infinity, 
                                repeatType: "loop",
                                ease: "easeIn"
                                }
                            }
                        }}
                    >
                    <button style={{ ...styles.dropdownSwitch}} 
                    onClick={() => setShowDropdown(!showDropdown)} aria-label={t("languages.language")}>
                        <span
                            style={{
                                marginLeft: 5,
                                marginRight: 1,
                                marginTop: showDropdown ? -2 : 3,
                                display: 'inline-block',
                                transition: 'transform 0.3s ease',
                                transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                        >
                            {showDropdown ? <FaAngleDown /> : <FaAngleRight />}
                        </span>
                        <span style={{ marginTop: 5, fontSize: 20, marginRight: 7 }}> <MdLanguage /></span>
                        <span style={{ opacity: showDropdown ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                            {showDropdown ? t("languages.language") : ""}
                        </span>
                    </button>
                    </motion.div>
                </div>
            </div>
            <div style={{ ...styles.dropdownContainer, visibility: showDropdown ? 'visible' : 'hidden' }} className={showDropdown ? 'fadeInFromLeft' : 'fadeOutToLeft'}>
                    {DropItem("Català", "ca")}
                    {DropItem("English", "en")}
            </div>
        </div>
    );
}

const styles = {
    langButtonContainer: {
        //width: 70,
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
        fontWeight: "bold",
        fontSize: 16,
        color: 'white',
      },
    dropdownContainer:{
        paddingLeft: 70,
        justifyContent: 'left',
    },
    dropdownItem: {
        width: '100%',
        height: 30,
        borderWidth: 0,
        backgroundColor: 'transparent',
        // borderColor: '#F07633',
        alignItems: 'center',
        justifyContent: 'left',
        padding: 0,
        fontFamily: 'Helvetica, sans-serif',
        fontSize: 14,
        textAlign: 'left',
        color: 'white',
    },
    seletedUnderline: {
        backgroundColor: '#C2C2C2',
        height: 2,
        transition: 'width 0.3s ease',
        marginRight: 5,
    }
};
