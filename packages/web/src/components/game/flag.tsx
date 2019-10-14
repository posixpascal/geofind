import React, {useState} from "react";
import {language} from "../../i18n";
import * as DE from "../../i18n/de.json";
import * as EN from "../../i18n/en.json";

export const Flag = ({country}) => {
    const [showImage, setShowImage] = useState(true);

    const handleImageError = () => setShowImage(false);

    const flagImage = (
        <img
            width={48}
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
