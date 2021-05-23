import {Client, Room} from "colyseus";
import {User, verifyToken} from "@colyseus/social";
import {Country} from "../schema/Country";
import {TRANSLATED_COUNTRIES} from "../config/translatedCountries";

export class CoreGameRoom<T> extends Room {
    public mapSet: any;


    public async onAuth(client: Client, options: any) {
        const token = verifyToken(options.token);
        try {
            const user = await User.findById(token._id);
            if (user) {
                return user;
            }
        } catch (err) {
            return User.create();
        }
        return User.create();
    }

    public playersReady() {
        let ready = true;
        this.state.players.forEach((player) => {
            if (!player.isReady) {
                ready = false;
            }
        });
        return ready;
    }

    public setCountry() {
        const randomCountry = this.mapSet[Math.floor(Math.random() * this.mapSet.length)];
        const country = new Country();
        country.countryCode = randomCountry.country_code;
        country.lat = randomCountry.latlng[0];
        country.lng = randomCountry.latlng[1];
        country.countryNameEn = randomCountry.name;
        country.countryNameDe = TRANSLATED_COUNTRIES[country.countryCode] || country.countryNameEn;
        console.log(country.countryNameEn);
        this.state.country = country;
    }
}
