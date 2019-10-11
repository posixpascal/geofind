import React, {useState} from "react";

export const Flag = ({country}) => {
    const [showImage, setShowImage] = useState(true);

    const handleImageError = () => setShowImage(false);

    const flagImage = (
        <img
            width={48}
            onError={handleImageError}
            src={`/assets/${country.countryCode.toLowerCase()}.png`}
        />
    );

    return (
        <h2>
            {showImage && flagImage}
            {country.countryNameEn}
        </h2>
    );
};
