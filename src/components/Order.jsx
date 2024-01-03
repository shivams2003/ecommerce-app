import React from "react";
import "./Order.css";
import moment from "moment/moment";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "./CheckoutProduct";

function Order({ order }) {
	return (
		<div className="order">
			<h2>Order</h2>
			<p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
			<p className="orderId">
				<small>{order.id}</small>
			</p>
			{order.data.basket?.map((item) => (
				<CheckoutProduct
					id={item.id}
					image={item.image}
					title={item.title}
					price={item.price}
					rating={item.rating}
				/>
			))}
			<CurrencyFormat
				renderText={(value) => <h3 className="orderTotal">Order Total: {value}</h3>}
				decimalScale={2}
				value={order.data.amount / 100} // convert from paise to rupees
				displayType="text"
				thousandSeparator={true}
				prefix="₹"
			/>
		</div>
	);
}

export default Order;
