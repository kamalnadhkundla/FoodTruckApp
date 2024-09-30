import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from  '../hooks/useHttp.js'

const requestConfig={};

export default function Meals() {
  

   const {data:loadedMeals,
isLoading,
error,
}= useHttp('http://localhost:3000/meals',requestConfig,[])
if(isLoading){
    return <p>Loading</p>
}
   
return (
        <ul id="meals">
            {loadedMeals.length > 0 ? (
                loadedMeals.map((meal) => (
                   <MealItem key={meal.id} meal={meal}/>
                ))
            ) : (
                <li>No meals available</li>
            )}
        </ul>
    );
}
