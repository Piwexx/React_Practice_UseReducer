import { types } from '../types';

const initialProductState = {
	products: [
		{ id: 1, title: 'product 1' },
		{ id: 2, title: 'product 2' },
	],
	cart: [{ id: 1, title: 'product 1', quantity: 1 }],
	activeProduct: { id: 2, title: 'product 2' },
};

const productReducer = (state, action) => {
	switch (action.type) {
		case types.productShow:
			return {
				...state,
				activeProduct: action.payload,
			};
		case types.productAddToCart:
			const newProduct = action.payload;
			const isInCart = state.cart.find(product => product.id === newProduct.id);
			return isInCart
				? {
						...state,
						cart: state.cart.map(product =>
							product.id === newProduct.id
								? { ...product, quantity: product.quantity + 1 }
								: product
						),
				  }
				: {
						...state,
						cart: [...state.cart, { ...action.payload, quantity: 1 }],
				  };
		case types.productRemoveFromCart:
			return {
				...state,
				cart: state.cart.filter(product => product.id !== action.payload),
			};
		case types.productRemoveOne:
			const productRemoveId = action.payload;
			const productDelete = state.cart.find(product => product.id === productRemoveId);

			return productDelete.quantity > 1
				? {
						...state,
						cart: state.cart.map(product =>
							product.id === productRemoveId
								? { ...product, quantity: product.quantity - 1 }
								: product
						),
				  }
				: {
						...state,
						cart: state.cart.filter(product => product.id !== productRemoveId),
				  };
		default:
			return state;
	}
};
export { initialProductState };
export default productReducer;
