// Импорт хуков useEffect и useState из библиотеки React.
import React, { useEffect, useState } from "react";

// Импорт стилей из файла App.css.
import "./App.css";

// Импорт пользовательских компонентов MyList и MyMealsAndIngredients.
import MyList from "./MyList";
import MyMealsAndIngredients from "./MyMealsAndIngredients";

// Импорт библиотеки для генерации уникальных идентификаторов.
import uuid from "react-uuid";

// Объявление функционального компонента App.
function App() {
    // Создание состояния mealPlans с использованием хука useState.
    // Если в localStorage есть сохраненные планы, загружаем их, иначе начальное значение - пустой массив.
    const [mealPlans, setMealPlans] = useState(
        localStorage.mealPlans ? JSON.parse(localStorage.mealPlans) : []
    );

    // Создание состояния selectedDay для отслеживания выбранного дня.
    const [selectedDay, setSelectedDay] = useState(false);

    // Использование хука useEffect для сохранения данных в localStorage при изменении mealPlans.
    useEffect(() => {
        localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
    }, [mealPlans]);

    // Объявление функции addMeal, которая добавляет новый прием пищи в массив mealPlans с использованием уникального идентификатора.
    const addMeal = () => {
        const newMeal = {
            title: "Today is...",
            id: uuid(),
            mealForADay: "",
            ingredients: "",
        };
        setMealPlans([newMeal, ...mealPlans]);
    };

    // Объявление функции deleteDay, которая удаляет прием пищи из mealPlans по идентификатору.
    const deleteDay = (mealId) => {
        setMealPlans(mealPlans.filter(({ id }) => id !== mealId));
    };

    // Объявление функции updateDay, которая обновляет прием пищи в mealPlans на основе переданных данных.
    const updateDay = (myUpdateMeal) => {
        const updateMeals = mealPlans.map((mealPlan) => {
            if (mealPlan.id === myUpdateMeal.id) {
                return myUpdateMeal;
            }
            return mealPlan;
        });
        setMealPlans(updateMeals);
    };

    // Объявление функции getActiveMeal, которая возвращает прием пищи с выбранным идентификатором.
    const getActiveMeal = () => {
        return mealPlans.find(({ id }) => id === selectedDay);
    };

    // Рендеринг компонента с использованием JSX, включая компоненты MyList и MyMealsAndIngredients,
    // передавая им необходимые props.
    return (
        <div className="App">
            <MyList
                mealPlans={mealPlans}
                addMeal={addMeal}
                deleteDay={deleteDay}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
            />
            <MyMealsAndIngredients
                selectedDay={getActiveMeal()}
                updateDay={updateDay}
            />
        </div>
    );
}

// Экспорт компонента App для использования в других частях приложения.
export default App;
