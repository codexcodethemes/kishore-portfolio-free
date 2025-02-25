import { useRef, useEffect, type FC } from "react";
import gsap from "gsap";
import type { SocialLink } from "../types";
import { ExternalLink, Github, Linkedin, Mail, Twitter } from "lucide-react";

type HeroBioProps = {
    biography: string;
    skills: string[];
    socialLinks: SocialLink[];
};

export const HeroBio: FC<HeroBioProps> = ({
    biography,
    skills,
    socialLinks,
}) => {
    const bioRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        if (!biography) {
            return;
        }

        setTimeout(() => {
            tl.fromTo(
                bioRef.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 2,
                    ease: "power2.out",
                }
            );
        }, 1000);
    }, []);

    const getSocialLinkIcon = (icon: SocialLink["icon"]) => {
        switch (icon) {
            case "linkedin":
                return Linkedin;
            case "twitter":
                return Twitter;
            case "external-link":
                return ExternalLink;
            case "mail":
                return Mail;
            case "github":
                return Github;
            default:
                return ExternalLink;
        }
    };

    // If there are no social links, don't render the connect section
    if (socialLinks.length === 0) {
        return null;
    }

    return (
        <div className="md:col-span-1 max-w-full md:max-w-[300px] mx-auto md:mx-0 px-4 md:px-0">
            <div ref={bioRef} className="space-y-6 md:space-y-8 opacity-0">
                {/* Biography Section */}
                {biography && (
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-text-primary mb-2 md:mb-3">
                            Biography
                        </h2>
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                            {biography}
                        </p>
                    </div>
                )}

                {/* Skills Section */}
                {skills.length > 0 && (
                    <div>
                        <h2 className="text-lg md:text-xl font-semibold text-text-primary mb-2 md:mb-3">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 md:px-4 md:py-2 bg-primary-50 text-primary-600 
                                rounded-full text-xs md:text-sm font-medium
                                hover:bg-primary-100 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Connect Section */}
                <div>
                    <h2 className="text-lg md:text-xl font-semibold text-text-primary mb-2 md:mb-3">
                        Connect
                    </h2>
                    <div className="flex gap-3 md:gap-4">
                        {socialLinks.map((link, index) => {
                            const Icon = getSocialLinkIcon(link.icon);
                            return (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-100 
                                         flex items-center justify-center
                                         text-text-secondary hover:bg-primary-50 
                                         hover:text-primary-600 transition-colors
                                         group"
                                >
                                    <Icon
                                        size={16}
                                        className="md:size-[20px] group-hover:scale-110 transition-transform"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
