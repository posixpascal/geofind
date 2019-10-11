import React, {useState} from "react";

export const Flag = ({country}) => {
    const [showImage, setShowImage] = useState(true);

    return <h2>
        {showImage && <img width={48} onerror={() => setShowImage(false)}
                           src={`/assets/${country.countryCode.toLowerCase()}.png`}/>}
        {country.countryNameEn}</h2>
}
