import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        
         addToCart: (state, action) => {
            const existingProductIndex = state.findIndex((product) => product.id === action.payload.id);            
            if (existingProductIndex === -1) {

                state.push(action.payload);

            } else {
                
                state[existingProductIndex] = {

                    ...state[existingProductIndex],

                    quantity: state[existingProductIndex].quantity + 1,
                };
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },

        
        removeFromCart: (state, action) => {
            const id = action.payload;
            const updatedCart = state.filter((item) => item.id !== id); 
            localStorage.setItem('cart', JSON.stringify(state));
            return updatedCart;
        },

        incrementQuantity: (state, action) => {

            const existingProductIndex = state.findIndex((product) => product.id === action.payload);

            if (existingProductIndex !== -1) {

                state[existingProductIndex].quantity += 1;

                localStorage.setItem('cart', JSON.stringify(state));
            }
        },

        decrementQuantity: (state, action) => {

            const existingProductIndex = state.findIndex((product) => product.id === action.payload);

            if (existingProductIndex !== -1 && state[existingProductIndex].quantity > 1) {

                state[existingProductIndex].quantity -= 1;

                localStorage.setItem('cart', JSON.stringify(state));
            }

        },

        ClearCart: (state) => {
            state = [];
            
            localStorage.setItem('cart', JSON.stringify([]));

            return [];
        }
    },
});

export const { addToCart, removeFromCart, incrementQuantity, ClearCart, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
