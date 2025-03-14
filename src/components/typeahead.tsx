import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDebounceCallback } from '../shared/hooks/useDebouceCallback';
import { useOutsideClick } from '../shared/hooks/useOutsideClick';
import { Ellipsis } from './ellipsis';
import style from './typeahead.module.css';

type IProps = {
    debounceTimer: number;
    list: Array<any>;
    onCallback: (value: string) => void;
    minLength: number;
    loading: boolean;
    inputValue: string;
    onSelect: (value: any) => void
}

export const Typeahead: FC<IProps> = ({
    debounceTimer, list, onCallback, minLength, loading, inputValue, onSelect
}) => {
    const typeaheadRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<string>(inputValue);
    const [showDropdown, setDropdownState] = useState(false);
    const debouncedCallback = useDebounceCallback(onCallback, debounceTimer);
    const onInputCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (event.target.value?.length > minLength) {
            debouncedCallback(event?.target?.value);
        }
    }, [minLength, debouncedCallback, setDropdownState]);
    const hideDropdownState = useCallback(() => {
        setDropdownState(false);
    }, [setDropdownState]);

    const showDropdownState = useCallback(() => {
        setDropdownState(true);
    }, [setDropdownState]);

    const onSelectItem = useCallback((selectedValue: any) => {
        onSelect(selectedValue);
        hideDropdownState();
    }, [hideDropdownState, onSelect]);
    useOutsideClick(typeaheadRef, hideDropdownState);

    useEffect(() => {
        if (value?.length > minLength)
            setValue(inputValue);
    }, [inputValue]);
    return (
        <div ref={typeaheadRef} className={style['typeahead']}>
            <input onFocus={showDropdownState} value={value} className={style['typeahead-input']} type="text" autoFocus={true} autoCorrect='off' autoComplete='off' autoCapitalize='off' onChange={onInputCallback} /> {loading ? <span>Loading</span> : null}
            {list?.length && value && inputValue === value && showDropdown ?
                <div className={style['dropdown-list']}>
                    {list.slice(0, 20).map(item =>
                        <div onClick={() => onSelectItem(item)} key={item.id} className={style['dropdown-item']}>
                            <div className={style['detail']}> <b>Name: </b> <span className={style['label']}>{item.name} </span> </div>
                            <div className={style['detail']}> <b>Email:  </b> <span className={style['label']}> {item.email} </span> </div>
                            <div className={style['detail']} > <b>Description: </b> <span className={style['label']}> <Ellipsis size={64} text={item.body} /> </span></div>
                        </div>
                    )}
                </div> : null
            }
        </div >
    )
}
