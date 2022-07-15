import React, { useState, useContext, useEffect, useCallback } from 'react'


const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()



const AppProvider = ({ children }) => {
  const[cocktails, setCoctails] = useState([])
  const[searchTerm, setSearchTerm] = useState('a')
  const[Loading, setLoading] = useState(true)


  const fetchCoctails = useCallback(async() => {
    setLoading(true)
    try {
      const response = await fetch(`${url} ${searchTerm}`)
      const data = await response.json()
      const {drinks} = data
      if(drinks) {
        const newCocktails = drinks.map((drink) => {
           const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = drink
           return{
             id: idDrink,
             name: strDrink,
             image: strDrinkThumb,
             glass: strGlass,
             info: strAlcoholic
           }
        })
        setCoctails(newCocktails)
      }else{    
        setCoctails([])
      }
      setLoading(false)
    } catch(error){
        setLoading(false)
    }
  }, [searchTerm])

  useEffect(()=> {
    fetchCoctails()
  }, [searchTerm, fetchCoctails])
  
  return(
   <AppContext.Provider 
     value={{
       Loading, 
       searchTerm,
       cocktails,
       setSearchTerm
     }}
     >
     {children}
   </AppContext.Provider>)
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
