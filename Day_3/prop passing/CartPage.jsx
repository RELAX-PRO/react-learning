import react from "react";


const CartPage = () => {
    // Component implementation
    return (
        <CheckoutSummary
            itemsCount={5}
            discountInfo={{ code: "SAVE20", percentage: 20 }}
            onConfirmPay={() => alert("Payment Confirmed!")}></CheckoutSummary>
    )
};