import defaultClass from "./searchBar.module.css";
import {useEffect, useState} from "react";
import {useDebounce} from 'use-debounce';
import {useSearch} from "@context/SearchContext.tsx";
import {useNavigate} from "react-router";

function SearchBar() {
    const { setSearch } = useSearch();
    const [filter, setFilter] = useState<string>('');
    const [debouncedFilter] = useDebounce(filter, 500);
    const navigate = useNavigate();

    useEffect(() => {
        if (filter){
            setSearch(debouncedFilter);
        }
    }, [debouncedFilter]);

    return (
        <div className={defaultClass.searchBarContainer}>
            <input
                type="text"
                className={defaultClass.searchInput}
                placeholder="Search ..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && filter.trim() !== '') {
                        navigate(`/search?q=${encodeURIComponent(filter)}`);
                    }
                }}
            />
            <button className={defaultClass.searchButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 17" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.8833 10.4327L14.47 14.0193C14.5961 14.1455 14.6669 14.3165 14.6668 14.4949C14.6667 14.6732 14.5958 14.8443 14.4697 14.9703C14.3435 15.0964 14.1724 15.1672 13.9941 15.1671C13.8158 15.1671 13.6447 15.0961 13.5187 14.97L9.932 11.3833C8.85981 12.2138 7.51152 12.6046 6.16142 12.4762C4.81132 12.3479 3.56082 11.71 2.66432 10.6924C1.76782 9.67479 1.29266 8.35387 1.3355 6.99836C1.37835 5.64285 1.93597 4.35457 2.89494 3.3956C3.85391 2.43663 5.14219 1.879 6.4977 1.83616C7.85321 1.79332 9.17413 2.26848 10.1917 3.16498C11.2094 4.06148 11.8472 5.31198 11.9756 6.66208C12.1039 8.01218 11.7131 9.36047 10.8827 10.4327M6.66667 11.1667C7.72754 11.1667 8.74495 10.7452 9.4951 9.99509C10.2452 9.24494 10.6667 8.22752 10.6667 7.16666C10.6667 6.10579 10.2452 5.08838 9.4951 4.33823C8.74495 3.58809 7.72754 3.16666 6.66667 3.16666C5.6058 3.16666 4.58839 3.58809 3.83824 4.33823C3.0881 5.08838 2.66667 6.10579 2.66667 7.16666C2.66667 8.22752 3.0881 9.24494 3.83824 9.99509C4.58839 10.7452 5.6058 11.1667 6.66667 11.1667Z" fill="black"/>
                </svg>
            </button>
        </div>
    )
}

export default SearchBar;