import React, { FC } from 'react';

type IProps = {
    text: string;
    size: number;
}

export const Ellipsis: FC<IProps> = ({
    text, size
}) => {

    return <span>{text.slice(0, size)} {text.length > size ? '...' : null} </span>
}
