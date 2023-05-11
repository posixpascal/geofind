import {Checkbox} from "@/components/Checkbox";
import {useState} from "react";

export const GameSettingsSelection = () => {
    const [isPublic, setPublic] = useState(false);

    return <div className={'flex flex-col py-4 gap-4'}>
        <div className={'flex justify-between'}>
            <div>Is Public?</div>
            <Checkbox onChange={setPublic} defaultChecked={isPublic}/>
        </div>

        <div className={'flex justify-between'}>
            <div>Closest match wins?</div>
            <Checkbox onChange={setPublic} defaultChecked={isPublic}/>
        </div>

        <div className={'flex justify-between'}>
            <div>With borders?</div>
            <Checkbox onChange={setPublic} defaultChecked={isPublic}/>
        </div>

        <div className={'flex justify-between'}>
            <div>With islands?</div>
            <Checkbox onChange={setPublic} defaultChecked={isPublic}/>
        </div>
    </div>
}