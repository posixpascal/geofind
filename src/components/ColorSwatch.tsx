interface ColorSwatchProps {
    color: string;
}

export const ColorSwatch : React.FC<ColorSwatchProps> = ({color}) => {
    return <div className={'inline-flex h-8 w-8 rounded-full'} style={{background: color
    }}>

    </div>
}