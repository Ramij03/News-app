import CountryList  from '@/constants/CountryList';
import { useCallback, useState } from "react";


const useNewsCountries = () => {
    const [newsCountry, setNewsCountry] = useState(CountryList);

    const toggleNewsCountry = useCallback((id:number) => {
        setNewsCountry((prevNewsCountry) => {
            return prevNewsCountry.map((item, index) => {
                if (index === id) {
                    return {
                        ...item,
                        selected: !item.selected,
                    };
                }
                return item;
            });
        });
    }, []); 

    return {
        newsCountry,
        toggleNewsCountry,
    };
};

export default useNewsCountries;
