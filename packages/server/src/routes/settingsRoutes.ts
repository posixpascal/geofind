import express from "express";
import {User} from "@colyseus/social";
import {JWT_SECRET} from "@colyseus/social/src/env";
import jwt from "express-jwt";

const jwtMiddleware = jwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: "cauth",
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});

const router = express.Router();
router.post('/set-pin', jwtMiddleware, async (req: any, res, next) => {
    const {_id} = req.cauth;
    const user = await User.findById(_id);
    user.metadata.pin = req.body.pin;
    await User.updateOne({
        _id,
    }, {
        $set: {
            metadata: {
                pin: Number(user.metadata.pin)
            },
        },
    });

    await user.save();
    res.send("OK");
});


router.post('/set-name', jwtMiddleware, async (req: any, res, next) => {
    const {_id} = req.cauth;
    const user = await User.findById(_id);
    user.displayName = req.body.displayName;
    await User.updateOne({
        _id,
    }, {
        $set: {
            displayName: user.displayName
        },
    });

    await user.save();
    res.send("OK");
});


router.post('/set-map', jwtMiddleware, async (req: any, res, next) => {
    const {_id} = req.cauth;
    const user = await User.findById(_id);
    await User.updateOne({
        _id,
    }, {
        $set: {
            metadata: {
                mapStyle: req.body.mapStyle,
            }
        },
    });

    await user.save();
    res.send("OK");
});


export const settingsRoutes = router;
