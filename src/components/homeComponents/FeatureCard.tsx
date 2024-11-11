/* eslint-disable @next/next/no-img-element */
import React from "react";
import cityIcon from "@/public/CitiesIcon.svg";
import placeIcon from "@/public/placeicon.svg";
import hotelIcon from "@/public/hotel.svg";
import reviewIcon from "@/public/review.svg";
import Image from "next/image";

const featureCards = [
    {
        icon: cityIcon,
        number: "50+",
        label: "Cities",
    },
    {
        icon: placeIcon,
        number: "900+",
        label: "Places",
    },
    {
        icon: hotelIcon,
        number: "300+",
        label: "Hotels",
    },
    {
        icon: reviewIcon,
        number: "1000+",
        label: "Reviews",
    },
];

const FeatureCard = () => {
    return (
        <div className="w-full grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 justify-between">
            {featureCards.map(({ icon, number, label }, index) => (
                <div
                    key={index}
                    className="w-full flex flex-row items-center justify-center bg-gray-500 text-white rounded-lg p-6 h-32 shadow-lg gap-5"
                >
                    <Image src={icon} alt={label} className="w-20 h-20" />
                    <div className="flex flex-col">
                        <div className="text-4xl font-bold">{number}</div>
                        <div className="text-lg">{label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeatureCard;