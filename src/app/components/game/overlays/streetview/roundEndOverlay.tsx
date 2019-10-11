import React, {useState} from "react";
import {strings} from "../../../../i18n";
import {Countdown} from "../../../countdown";
import {Flag} from "../../flag";

export const RoundEndOverlay = ({game}) => {
    const [showImage, setShowImage] = useState(true);

    return <div>
        <p>
            {strings.roundEnd}
        </p>
        {game.roundWinner && <div>
            Round Winner<br/>
            {game.players[game.roundWinner].displayName}<br/>
            <Flag country={game.country} />
            <hr/>
            Next Round starts in
            <br/>
            <Countdown from={7}/>
        </div>}

        {!game.roundWinner && <div>
            Darn it. No one found it.
            You were stranded in:
            <h2>
                {showImage && <img width={48} onError={() => setShowImage(false)}
                                   src={`/assets/${game.country.countryCode.toLowerCase()}.png`}/>}
                {game.country.countryNameEn}</h2>
        </div>}
    </div>
};
