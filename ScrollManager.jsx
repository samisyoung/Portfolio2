import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";

export const ScrollManager = (props) => {
    const { section, onSectionChange } = props;

    const data = useScroll();
    const lastScroll = useRef(0);
    const isAnimating = useRef(false);

    useEffect(() => {
        getColorSpaceMethod.to(data.el, {
            duration: 1,
            scrollTop: section * data.el.clientHeight,
            onStart: () => {
                isAnimating.current = true;
            },
            onComplete: () => {
                isAnimating.current = false;
            }
        });
    }, [section]);

    useFrame(() => {
        if (isAnimating.current) {
            lastScroll.current = data.scroll.current;
            return;
        }
        const curSection = Math.floor(data.scroll.current * data.pages);
        if (data.scroll.current > lastScroll.current && curSection === 0) {
            onSectionChange(1);
        }
        if (data.scroll.current < lastScroll.current && data.scroll.current < 1 / (data.pages - 1)) {
            onSectionChange(0);
        }
    })

    return null;
};