import React, {useState} from "react";
import {language} from "../../i18n";

export const Flag = ({country}) => {
    const [showImage, setShowImage] = useState(true);
    const flagWidth = window.innerWidth < 767 ? 32 : 48;
    const handleImageError = () => setShowImage(false);

    const flagImage = (
        <img
            width={flagWidth}
            alt={""}
            onError={handleImageError}
            src={`/assets/${country.countryCode.toLowerCase()}.png`}
        />
    );

    return (
        <h2>
            {showImage && flagImage}
            {language.indexOf("de") > -1 ? country.countryNameDe : country.countryNameEn}
        </h2>
    );
};
