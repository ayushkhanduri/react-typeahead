import { useEffect } from "react";


export const useOutsideClick = (ref: React.RefObject<any>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (evt: MouseEvent) => {
            if (ref.current && !ref.current.contains(evt.target)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });
};

