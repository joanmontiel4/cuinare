import './ingredients.scss';

export function Ingredients({
    ingListFilter,
    ingredientsList,
    handleIngredientClick,
}: {
    ingListFilter: Function;
    ingredientsList: Array<string>;
    handleIngredientClick: Function;
}) {
    return (
        <div className="ingredients">
            <div className="ingredients__header">
                <h3 className="ingredients__title">
                    Ingredients:{' '}
                    {`(${ingListFilter().length}/${ingredientsList.length})`}
                </h3>
                <span className="ingredients__subtitle">
                    Click on any ingredient to select it.
                </span>
            </div>
            <div className="ingredients__box">
                <ul className="ingredients__list">
                    {ingListFilter().map((item: string) => (
                        <li
                            key={item}
                            className="ingredients__item"
                            onClick={(ev) => handleIngredientClick(ev, item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
