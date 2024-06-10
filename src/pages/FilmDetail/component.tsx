import React from "react";
import {FormInput} from "../../base-components/Form";



interface InfoItemProps {
    title: string;
    placeholder: string;
    id: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({ title, placeholder, id }) => (
    <div className="mt-3">
        <h3 className="mt-3 text-lg py-3 font-medium leading-none">
            {title}
        </h3>
        <FormInput id={id} type="text"
                   style={{fontSize: '18px'}}
                   placeholder={placeholder} disabled/>
    </div>
);

interface CreditCardProps {
    name: string;
    image_url: string;
    role: string;
}

export const CreditCard: React.FC<CreditCardProps> = ({ name, image_url, role  }) => (
    <div className="flex items-center py-2">
        <div className="relative w-16 h-16">
            <div
                className="w-full h-full overflow-hidden rounded-full image-fit border-[3px] border-slate-200/70">
                <img
                    className="w-full h-full object-cover"
                    src={image_url}
                    alt={name}
                />
            </div>
        </div>
        <div className="ml-3.5">
            <div className="font-medium">
                {name}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
                {role}
            </div>
        </div>
    </div>
);