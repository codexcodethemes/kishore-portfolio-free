export type HeroProps = {
    name: string;
    biography: string;
    skills: string[];
    socialLinks: SocialLink[];
    stats: Stat[];
    image: {
        src: string;
        alt: string;
    };
};

export type SocialLink = {
    href: string;
    icon: "linkedin" | "twitter" | "external-link" | "mail" | "github";
    label: string;
};

export type Stat = {
    title: string;
    value: number;
    suffix?: string;
};
