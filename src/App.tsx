import { useCallback, useState } from 'react';
import styles from './app.module.css';
import { Typeahead } from './components/typeahead';
import { ApiService } from './shared/service/api-service';
import { ErrorState } from './shared/service/error';
import { IDropdownValue, IResponse } from './shared/types';

function App() {
    const [dropdownList, setDropdownList] = useState<Array<IDropdownValue>>([]);
    const [loading, setLoadingState] = useState<boolean>(false);
    const [_error, setError] = useState<string>(''); // can manage error states in the future
    const [queryString, setQueryString] = useState<string>('');
    const [_selectedValue, setSelectedValue] = useState<IDropdownValue | null>(null);
    const onSelect = useCallback((value: IDropdownValue) => {
        setSelectedValue(value);
        setQueryString(value.name);
    }, [setSelectedValue, setQueryString]);
    const getList = useCallback(async (value: string) => {
        setLoadingState(true);
        setError('');
        setDropdownList([]);
        setQueryString(value);
        try {
            const response = await ApiService.fetchComments(value) as Array<IResponse>;
            const dropdownList: Array<IDropdownValue> = response.map((item) => ({
                name: item.name,
                email: item.email,
                body: item.body,
                id: item.id
            }));
            setDropdownList(dropdownList);
        } catch (e) {
            setError((e as ErrorState).message);
        } finally {
            setLoadingState(false);
        }
    }, [setDropdownList, setLoadingState]);
    return (
        <div className={styles['app']}>
            <div><h3>React Typeahead</h3> </div>
            <div className={styles['comment-type']}>
                <Typeahead onSelect={onSelect} inputValue={queryString} loading={loading} debounceTimer={1500} minLength={3} onCallback={getList} list={dropdownList} />
            </div>
        </div>
    );
}

export default App;
