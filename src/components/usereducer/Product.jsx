import React, { useReducer } from 'react';
import productReducer, { initialProductState } from '../../reducers/productoReducer';
import { types } from '../../types';

export const Product = () => {
	const [productState, dispatch] = useReducer(productReducer, initialProductState);
	const { products, cart, activeProduct } = productState;
	return (
		<>
			<h2>Products</h2>
			<ul>
				{products.map(product => (
					<li key={product.id}>
						{product.title}
						<button
							onClick={() => {
								dispatch({
									type: types.productShow,
									payload: product,
								});
							}}>
							Show
						</button>
						<button
							onClick={() => {
								dispatch({
									type: types.productAddToCart,
									payload: product,
								});
							}}>
							Add to cart
						</button>
					</li>
				))}
			</ul>
			<ul>
				{cart.map(product => (
					<li key={product.id}>
						{product.title}-Quantity: {product.quantity}
						<button
							onClick={() =>
								dispatch({
									type: types.productRemoveOne,
									payload: product.id,
								})
							}>
							Remove one
						</button>
						<button
							onClick={() =>
								dispatch({
									type: types.productRemoveFromCart,
									payload: product.id,
								})
							}>
							Remove All
						</button>
					</li>
				))}
			</ul>
			<h2>Preview</h2>
			<p>{activeProduct.title}</p>
		</>
	);
};
