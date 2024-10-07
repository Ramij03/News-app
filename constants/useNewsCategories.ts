import { useCallback, useState } from "react";
import newsCategoryList from "./Categories";

const useNewsCategories = () => {
    const [newsCategories, setNewsCategories] = useState(newsCategoryList);

    const toggleNewsCategory = useCallback((id: number) => {
        setNewsCategories((prevNewsCategories) => {
            return prevNewsCategories.map((item) => {
                if (item.id === id) {
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
        newsCategories,
        toggleNewsCategory,
    };
};

export default useNewsCategories;
