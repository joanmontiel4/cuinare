import { SyntheticEvent } from 'react';
import { iCategory } from '../../../infrastructure/interfaces/icategory';
import './categorybtn.scss';

export function CategoryBtn({
    category,
    selectedCategory,
    setSelectedCategory,
}: {
    category: iCategory;
    selectedCategory: string;
    setSelectedCategory: Function;
}) {
    const handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        setSelectedCategory(category.name);
    };

    return (
        <div
            className={
                selectedCategory === category.name
                    ? 'category-btn category-btn--selected'
                    : 'category-btn'
            }
            onClick={handleClick}
        >
            <img
                className="category-btn__img"
                src={category.image}
                alt="category"
            />
            <button className="category-btn__button">{category.name}</button>
        </div>
    );
}
