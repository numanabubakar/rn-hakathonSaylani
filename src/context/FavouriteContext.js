import React, { createContext, useReducer, useContext } from 'react'
import Toast from 'react-native-toast-message'
const FavContext = createContext();
const FavReducer = (state, action) => {

    const { favHouses } = state;

    let product;

    switch (action.type) {

        case 'ADD_TO_FAV':

            const check = favHouses.find(product => product.uid === action.id);
            if (check) {
                Toast.show({
                    type: 'error',
                    text1: "This House is Already in your Wishlist",
                    position: 'top',
                    visibilityTime: 3000,
                    bottomOffset: 30
                });
                return state;
            }
            else {
                product = action.item;
                Toast.show({
                    type: 'success',
                    text1: "This House Added to your Wishlist",
                    position: 'top',
                    visibilityTime: 3000,
                    bottomOffset: 30
                })
                // console.log(favHouses)
                return ({
                    favHouses: [product, ...favHouses]

                }

                )
            }
          


        case 'DELETE':
            const filtered = favHouses.filter(product => product.uid !== action.id);
            product = action.item;
            Toast.show({
                type: 'success',
                text1: "House remove from your Wishlist",
                position: 'top',
                visibilityTime: 3000,
                bottomOffset: 30
            })
            return {
                favHouses: [...filtered],
            }
           

        case 'EMPTY':
            Toast.show({
                type: 'success',
                text1: "All Data Remove from your Wishlist",
                position: 'top',
                visibilityTime: 3000,
                bottomOffset: 30
            })
            return {
                favHouses: []
            }

        default:
            return state;

    }

}
export const FavouriteContextProvider = (props) => {

    const [state, dispatch] = useReducer(FavReducer, { favHouses: [] })

    return (
        <FavContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </FavContext.Provider>
    )
}
export const useFavContext = () => {
    return useContext(FavContext)
}