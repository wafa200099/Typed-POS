import React from "react";
interface Props{
  cart: cartProps[]
  totalAmount:number,
   totalAfter:number,
   discountValue:number,
    taxValue:number
}
interface cartProps{
  quantity: number;
   total: number;
   id: number | null;
   name: string;
   code: string;
   price: string;
   category: string;
   image: string;
}

export const ComponentToPrint = React.forwardRef((props:Props, ref:any) => {
  const { cart, totalAmount, totalAfter, discountValue, taxValue }  = props;
  return (
    <div ref={ref} className="p-5">
      <table className='table'>
        <thead>
          <tr>
            <td>code</td>
            <td>Name</td>
            <td>Price</td>
            <td>Qty</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {cart ? cart.map((cartProduct: any, key: any) => <tr key={key}>
            <td>{cartProduct.code}</td>
            <td>{cartProduct.name}</td>
            <td>{cartProduct.price}</td>
            <td>{cartProduct.quantity}</td>
            <td>{cartProduct.total}</td>
          </tr>)
            : ''}
        </tbody>
      </table>
      <p className='px-2'> Added Tax: ${taxValue}</p>
      <p className='px-2'>Discount : ${discountValue}</p>
      <p className='px-2'>Total Amount: ${totalAmount}</p>
      <p className='px-2'>Total Amount After Tax And Discount: ${totalAfter}</p>
    </div>
  );
});