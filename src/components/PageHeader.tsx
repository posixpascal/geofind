import React from "react";

interface PageHeaderProps {
    title: string;
    description: string;
    icon?: string;
}
export const PageHeader : React.FC<PageHeaderProps> = ({title, description, icon }) => {
    return <div data-page-header className={'flex items-center gap-12 mb-6'}>
        <div className={'flex-grow'}>
        <h3 className={'font-black text-3xl text-headline uppercase'}>{title}</h3>
        <p className={'text-lg text-paragraph'}>{description}</p>
        </div>
        <div>
            <span className={'text-7xl'}>{icon}</span>
        </div>
    </div>
}