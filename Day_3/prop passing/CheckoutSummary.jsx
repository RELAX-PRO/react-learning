import react from "react";

const CheckoutSummary = ({itemsCount, discountInfo, onConfirmPay}) => 
{
    const {code, percentage} = discountInfo;
    return 
    (
    <div className="checkout-summary">
        <h6>Items Number{itemsCount}</h6> 
        <div>Discount: {code} = {percentage}%</div>
        <button onClick={onConfirmPay}> Confirm Payment</button>
    </div>
    )
}
export default CheckoutSummary;