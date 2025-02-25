import { useRef, useEffect, type FC } from "react";
import gsap from "gsap";
import type { Stat } from "../types";

type HeroStatsProps = {
    stats: Stat[];
};

export const HeroStats: FC<HeroStatsProps> = ({ stats }) => {
    const statsRef = useRef<HTMLDivElement>(null);
    const counterRefs = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        if (stats.length === 0) {
            return;
        }

        setTimeout(() => {
            // Animate numbers
            counterRefs.current.forEach((counter, index) => {
                gsap.to(counter, {
                    innerText: stats[index].value,
                    duration: 4,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                    onUpdate: function () {
                        const currentNumber = Math.round(
                            Number(
                                gsap.getProperty(this.targets()[0], "innerText")
                            )
                        );
                        this.targets()[0].innerText = `${currentNumber}${
                            stats[index].suffix || ""
                        }`;
                    },
                });
            });
        }, 1000);

        gsap.fromTo(
            statsRef.current,
            {
                opacity: 0,
            },
            {
                opacity: 1,
            }
        );
        // Fade in animation
        gsap.from(statsRef.current.children, {
            y: 30,
            opacity: 0,
            duration: 2,
            stagger: 0.2,
            ease: "power2.out",
            delay: 1,
        });
    }, [stats]);

    return (
        <div
            ref={statsRef}
            className="md:col-span-1 flex flex-row md:flex-col justify-center md:justify-start space-y-0 space-x-4 md:space-x-0 md:space-y-12 mt-8 md:mt-0 opacity-0"
        >
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="flex-1 text-center md:text-right transform hover:scale-105 transition-transform duration-300 px-2 md:px-4"
                >
                    <h3 className="text-xs sm:text-sm md:text-base font-medium text-text-secondary mb-1 md:mb-2 uppercase tracking-wider md:whitespace-nowrap">
                        {stat.title}
                    </h3>
                    <span
                        ref={(el) => {
                            counterRefs.current[index] = el;
                        }}
                        className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-300 leading-tight"
                    >
                        0
                    </span>
                </div>
            ))}
        </div>
    );
};
