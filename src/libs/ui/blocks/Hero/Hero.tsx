import { useEffect, useRef } from "react";
import { HeroTitle } from "./components/HeroTitle";
import { HeroBio } from "./components/HeroBio";
import { HeroImage } from "./components/HeroImage";
import { HeroStats } from "./components/HeroStats";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { type HeroProps } from "./types";

const Hero: React.FC<HeroProps> = ({
    name,
    biography,
    skills,
    socialLinks,
    stats,
    image,
}) => {
    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            heroRef.current,
            {
                zIndex: 100,
            },
            {
                zIndex: 0,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=20%",
                    scrub: true,
                    toggleActions: "play none reverse none",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section ref={heroRef}>
            <div className="min-h-screen flex items-center relative justify-between px-4 md:px-10 py-4 bg-background ">
                <a
                    href="https://codexcode.store/themes/kishore-portfolio"
                    className="absolute top-4 left-4 px-4 py-2 bg-primary text-white bg-tertiary-900 rounded-xl"
                >
                    Get Pro Version
                </a>
                <div
                    ref={contentRef}
                    className="grid grid-cols-1 md:grid-cols-3 w-full origin-center"
                >
                    <HeroTitle name={name} />
                    <HeroBio
                        biography={biography}
                        skills={skills}
                        socialLinks={socialLinks}
                    />
                    <HeroImage src={image.src} alt={image.alt} />
                    <HeroStats stats={stats} />
                </div>
            </div>
        </section>
    );
};

export default Hero;
