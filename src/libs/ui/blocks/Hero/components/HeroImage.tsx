import { useRef, useEffect, type FC } from "react";
import gsap from "gsap";

type HeroImageProps = {
    src: string;
    alt: string;
};

export const HeroImage: FC<HeroImageProps> = ({ src, alt }) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const shapesRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!src) {
            return;
        }

        setTimeout(() => {
            // Image pulse animation
            gsap.fromTo(
                imageRef.current,
                {
                    scale: 1,
                    opacity: 0,
                },
                {
                    scale: 1.05,
                    opacity: 1,
                    duration: 1,
                    ease: "power1.inOut",
                }
            );
        }, 1500);

        setTimeout(() => {
            // Floating shapes animations
            gsap.fromTo(
                shapesRef.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 1,
                    ease: "power1.inOut",
                }
            );
        }, 1500);

        const shapes = shapesRef.current.children;

        Array.from(shapes).forEach((shape: React.RefObject<HTMLDivElement>) => {
            gsap.to(shape, {
                x: "random(-20, 20)",
                y: "random(-20, 20)",
                rotation: "random(-360, 360)",
                duration: "random(4, 10)",
                repeat: -1,
                yoyo: true,
                ease: "none",
                delay: "random(0, 2)",
            });
        });

        // Add mouse movement effect
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate mouse position relative to center (-1 to 1)
            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            // Move both image and shapes container
            gsap.to(containerRef.current, {
                x: xPos * 20,
                y: yPos * 20,
                rotateX: yPos * 5,
                rotateY: -xPos * 5,
                duration: 1,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="lg:col-span-1 flex justify-center items-center relative my-8 md:my-0">
            <div
                ref={containerRef}
                className="flex justify-center items-center relative"
                style={{ transform: "perspective(1000px)" }}
            >
                {/* Floating shapes container */}
                <div
                    ref={shapesRef}
                    className="absolute inset-0 pointer-events-none opacity-0"
                >
                    {/* Make shapes responsive */}
                    <div className="absolute top-0 left-[10%] w-8 sm:w-12 h-8 sm:h-12 bg-primary-200 rounded-full opacity-60" />
                    <div className="absolute -top-[20px] sm:-top-[40px] right-1/4 w-8 sm:w-12 h-8 sm:h-12 border-2 border-secondary-300 rotate-45" />
                    <div className="absolute -bottom-1/4 left-1/3 w-4 sm:w-6 h-4 sm:h-6 bg-primary-300 rounded-lg opacity-60" />
                    <div className="absolute top-1/3 -right-[20px] sm:-right-[40px] w-6 sm:w-10 h-6 sm:h-10 border-2 border-primary-400 rounded-full" />
                    <div className="absolute bottom-0 right-[10%] w-6 sm:w-8 h-6 sm:h-8 bg-secondary-200 rotate-12 opacity-60" />
                </div>

                {/* Image container */}
                <div
                    ref={imageRef}
                    className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] rounded-full overflow-hidden bg-surface shadow-lg z-10 opacity-0"
                >
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            </div>
        </div>
    );
};
