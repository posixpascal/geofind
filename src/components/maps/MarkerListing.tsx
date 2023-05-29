import {useSelector} from "@legendapp/state/react";
import {multiPlayerState} from "@/state/multiplayer";
import {RoundState} from "@prisma/client";
import {useEffect, useRef} from "react";
import {mapState} from "@/state/map";
import {trpc} from "@/utils/trpc";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {Marker} from "maplibre-gl";
import {PIN_COLORS} from "@/server/constants/pins";

const useMapElements = (multiPlayer, map) => {
    const {user} = useCurrentUser();
    const countryCoords = trpc.countries.lookup.useQuery(
        {
            id: multiPlayer.countryId,
        },
        {
            refetchInterval: 1000,
        }
    );
    const otherMarkers = useRef([]);
    const countryMarker = useRef(null);

    useEffect(() => {
        if (!map) {
            return;
        }

        if (!countryCoords.data) {
            return;
        }

        if (countryMarker.current) {
            return;
        }

        if (otherMarkers.current.length) {
            return;
        }

        if (multiPlayer.roundState === RoundState.ENDED) {
            map.zoomOut();

            const {lng, lat} = countryCoords.data[0]; // TODO: what if empty?
            countryMarker.current = new Marker({
                color: "red",
                draggable: false,
            }).setLngLat([lng, lat]);
            countryMarker.current.addTo(map);

            // show marker for other players
            const otherSessions = multiPlayer.sessions.filter(
                (session) => session.userId !== user.data.id
            );
            otherMarkers.current = otherSessions.map((session) => {
                const otherPlayerMarker = new Marker({
                    color: PIN_COLORS[session.user.color],
                    draggable: false,
                }).setLngLat([session.lng, session.lat]);
                otherPlayerMarker.addTo(map);
                return otherPlayerMarker;
            });
        }

        return () => {
            if (countryMarker.current) {
                countryMarker.current.remove();
                countryMarker.current = null;
            }

            if (otherMarkers.current) {
                otherMarkers.current.forEach((marker) => marker.remove());
                otherMarkers.current = [];
            }
        };
    }, [
        map,
        otherMarkers.current,
        countryMarker.current,
        multiPlayer.roundState,
        countryCoords.data,
    ]);
};

export const MarkerListing: React.FC = () => {
    const multiPlayer = useSelector(() => multiPlayerState.get());

    const map = useSelector(() => mapState.get());
    useMapElements(multiPlayer, map);

    if (!map) {
        return;
    }

    if (multiPlayer.roundState === RoundState.ENDED) {
        return (
            <div className={"p-4"}>
                <div className={"absolute right-0 top-0"}>test 1234</div>
            </div>
        );
    }

    return (
        <div>
            <div className={"absolute right-0 top-0"}>ScoreBoard</div>
        </div>
    );
};
