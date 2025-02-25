import { useRef, useEffect, type FC } from "react";
import gsap from "gsap";

type HeroTitleProps = {
    name: string;
};

export const HeroTitle: FC<HeroTitleProps> = ({ name }) => {
    const nameRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        if (!name) {
            return;
        }

        // Enhanced name animation
        tl.fromTo(
            nameRef.current,
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power1.inOut",
            }
        );
    }, []);

    return (
        <div className="col-span-full text-center mb-6 md:mb-12">
            <h1
                ref={nameRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text stroke-text-primary stroke-2 tracking-wider uppercase opacity-0"
                style={{
                    WebkitTextStroke: "1px #171717",
                }}
            >
                {name}
            </h1>
        </div>
    );
};
