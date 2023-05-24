import Pin1 from "@/assets/svgs/pins/pin1.svg";
import Pin2 from "@/assets/svgs/pins/pin2.svg";
import Pin3 from "@/assets/svgs/pins/pin3.svg";
import Pin4 from "@/assets/svgs/pins/pin4.svg";
import Pin5 from "@/assets/svgs/pins/pin5.svg";
import Pin6 from "@/assets/svgs/pins/pin6.svg";
import Pin7 from "@/assets/svgs/pins/pin7.svg";
import Pin8 from "@/assets/svgs/pins/pin8.svg";
import Pin9 from "@/assets/svgs/pins/pin9.svg";
import Pin11 from "@/assets/svgs/pins/pin11.svg";
import Pin12 from "@/assets/svgs/pins/pin12.svg";
import Pin13 from "@/assets/svgs/pins/pin13.svg";
import Pin14 from "@/assets/svgs/pins/pin14.svg";
import Pin15 from "@/assets/svgs/pins/pin15.svg";
import Pin16 from "@/assets/svgs/pins/pin16.svg";
import Pin17 from "@/assets/svgs/pins/pin17.svg";
import Pin18 from "@/assets/svgs/pins/pin18.svg";
import Pin19 from "@/assets/svgs/pins/pin19.svg";
import Pin20 from "@/assets/svgs/pins/pin20.svg";
import Pin21 from "@/assets/svgs/pins/pin21.svg";
import Pin22 from "@/assets/svgs/pins/pin22.svg";
import Pin23 from "@/assets/svgs/pins/pin23.svg";
import Pin24 from "@/assets/svgs/pins/pin24.svg";
import Pin25 from "@/assets/svgs/pins/pin25.svg";
import Pin26 from "@/assets/svgs/pins/pin26.svg";
import {Swipes} from "@/components/controls/Swipes";
import React, {useEffect, useState} from "react";
import {PIN_COLORS} from "@/server/constants/pins";
import {trpc} from "@/utils/trpc";

const PinComponents = [
    <Pin1/>,
    <Pin2/>,
    <Pin3/>,
    <Pin4/>,
    <Pin5/>,
    <Pin6/>,
    <Pin7/>,
    <Pin8/>,
    <Pin9/>,
    <Pin11/>,
    <Pin12/>,
    <Pin13/>,
    <Pin14/>,
    <Pin15/>,
    <Pin16/>,
    <Pin17/>,
    <Pin18/>,
    <Pin19/>,
    <Pin20/>,
    <Pin21/>,
    <Pin22/>,
    <Pin23/>,
    <Pin24/>,
    <Pin25/>,
    <Pin26/>,
];



export const PinSelection = () => {
    const [color, setColor] = useState(0);
    const [pin, setPin] = useState(0);

    const {data, refetch} = trpc.settings.pinAndColor.useQuery();
    const updatePinAndColor = trpc.settings.updatePinAndColor.useMutation();

    useEffect(() => {
        if (data) {
            console.log(data);

            setColor(data.color);
            setPin(data.pin);
        }
    }, [data]);

    const changePin = async (index) => {
        setPin(index);
        updatePinAndColor.mutateAsync({
            pin,
            color
        }).then(() => refetch())
    }

    const changeColor = async (index) => {
        setColor(index);
        updatePinAndColor.mutateAsync({
            pin,
            color
        }).then(() => refetch())
    }


    return <div>
        <Swipes title={'Pin'} defaultIndex={pin} onChange={changePin}>
            {PinComponents.map((pin, index) => (
                <div key={index} style={{color: PIN_COLORS[color]}} className={'w-full justify-center flex p-4'}>
                    <div className={'w-[96px] flex h-[96px] justify-center'}>
                        {pin}
                    </div>
                </div>
            ))}
        </Swipes>
        <Swipes title={'Wunschfarbe'} defaultIndex={color} onChange={changeColor}>
            {PIN_COLORS.map((color, index) => (
                <div key={index} style={{color: PIN_COLORS[color]}} className={'w-full justify-center flex p-4'}>
                    <div className={'w-[48px] flex h-[48px] justify-center rounded-full'} style={{backgroundColor: color}}>
                    </div>
                </div>
            ))}
        </Swipes>
    </div>;
};
