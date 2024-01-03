import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  // Card input states
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disable, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState();
  const [paymentId, setPaymentId] = useState();
  const [amountEntered, setAmount] = useState(0);
  const [timestamp, setTimestamp] = useState();
  useEffect(() => {
    /* 	
			To get a new client-secret every time the basket updates 
			to update the transaction details and create the new transaction 
		*/
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // stripe expects amounts in subunits -> paise instead of rupees
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      setPaymentId(response.data.paymentIntentId);
      setAmount(response.data.amount);
      setTimestamp(response.data.timestamp);
    };
    getClientSecret();
  }, [basket]);
  console.log("The client secret is ", clientSecret);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      setProcessing(true); // to disable the "buy now" button after one click

      const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
          // payment intent == payment confirmation
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentId)
            .set({
              basket: basket,
              amount: amountEntered,
              created: timestamp, // timestamp
            });

          setSucceeded(true);
          setError(null);
          setProcessing(false);

          dispatch({
            type: "EMPTY_BASKET",
          });

          navigate("/orders", { replace: true });
        });
    } else {
      navigate("/login", { replace: true });
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="paymentContainer">
        <h1>
          Checkout(
          <Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="paymentSection">
          <div className="paymentTitle">
            <h3>Delivery address</h3>
          </div>
          <div className="paymentAddress">
            <p>{user?.email}</p>
            <p>Park Street</p>
            <p>Kolkata WB</p>
          </div>
        </div>
        <div className="paymentSection">
          <div className="paymentTitle">
            <h3>Review items and delivery</h3>
          </div>
          <div className="paymentItems">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="paymentSection">
          <div className="paymentTitle">
            <h3>Payment Method</h3>
          </div>
          <div className="paymentDetails">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="paymentPriceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="₹"
                />
                <button disabled={processing || disable || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
