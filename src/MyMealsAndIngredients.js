const MyMealsAndIngredients = ({ selectedDay, updateDay }) => {
    // Функция editMyMeal обновляет состояние выбранного приема пищи при редактировании полей.
    const editMyMeal = (myInput, value) => {
        updateDay({
            ...selectedDay,
            [myInput]: value,
        });
    };

    // Если нет выбранного приема пищи, отображается сообщение "Plan your week ahead of time!".
    if (!selectedDay) return <p>Plan your week ahead of time!</p>;

    // Возвращается разметка компонента для отображения и редактирования выбранного приема пищи.
    return (
        <div className="whole-plan">
            <input
                type="text"
                className="myInput"
                placeholder="Today is..."
                id="title"
                value={selectedDay.title}
                onChange={(e) => editMyMeal("title", e.target.value)}
            />

            <textarea
                placeholder="Write your meal plan here"
                id="mealForADay"
                value={selectedDay.mealForADay}
                onChange={(e) => editMyMeal("mealForADay", e.target.value)}
            />

            <textarea
                placeholder="List of ingredients"
                value={selectedDay.ingredients}
                onChange={(e) => editMyMeal("ingredients", e.target.value)}
            />
        </div>
    );
};

export default MyMealsAndIngredients;
