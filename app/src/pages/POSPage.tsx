
import React, { useEffect, useState, useMemo } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavBarLayout from '../layouts/SideNavBarLayout'
import CartModal from '../component/CartModal';
// @ts-ignore
import { Spinner } from 'loading-animations-react';

interface productProps{
  id: number|null,
  name: string, 
  code: string,
  price: string, 
  category: string,
  image:string
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

const POSPage=()=> {
  const [products, setProducts] = useState<productProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cart, setCart] = useState<cartProps[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<productProps[]>([]);


  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }


  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get('products');
    setProducts(await result.data);
    setData(await result.data)
   setIsLoading(false)

  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addProductToCart = async (product:productProps) => {
    let findProductInCart = await cart.find(i => {
      //i  is the product im adding
      return i.id === product.id
    });

    if (findProductInCart) {
      let newCart: cartProps[] =[]
      let newItem :cartProps={
        id:null,
        quantity:0,
        total:0,
        price:"",
        name:"",
        code: "",
        category: " ",
        image:"",

      };

      cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            total: +cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to cart`, toastOptions)

    } else {
      let addingProduct = {
        // we pass same product (name +price )plus new extintion like(qty and total) 
        ...product,
        quantity: 1,
        total: +product.price,//as item added for the first time to the cart the price = total
      }

      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions)
    }
  }


  const removeCartProduct = async (product:productProps) => {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id)
    setCart(newCart)
    toast.error(`remove ${product.name} from cart`, toastOptions)
  }

  //evry time the item in the cart change we are going to calculate total amount
  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((itmeInCart) => {
      newTotalAmount = newTotalAmount + itmeInCart.total
    })
    setTotalAmount(newTotalAmount)
  }, [cart])



  const DecreaseCartProduct = async (product:productProps) => {
    // let findProductInCart = await cart.find(i => {
    //   return i.id === product.id
    // });

    let newCart: cartProps[] =[]
    let newItem :cartProps={
      id:null,
      quantity:0,
      total:0,
      price:"",
      name:"",
      code: "",
      category: " ",
      image:"",

    };

      cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity - 1,
            total:+ cartItem.price * (cartItem.quantity - 1)
          }

          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast.error(`${newItem.name} quantity Decreased By 1`, toastOptions)
    }

  
  //for search and filter
  //recompute the memoized value when one of the deps has changed.
  const productList:productProps[]  = useMemo(() => {
    if (!search) return data;
    return data.filter((product:productProps) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, data])


  const filterResult = (cartItem:string) => {
    const result= products.filter((currdata) => {
      return currdata.category === cartItem
    }
    )
    setData(result) 
  }
  return (
    <MainLayout>
      <SideNavBarLayout />
      <CartModal totalAmount={totalAmount} removeCartProduct={removeCartProduct} DecreaseCartProduct={DecreaseCartProduct} cart={cart} addProductToCart={addProductToCart} />
      <div className="input-group mx-3 ">
        <div className="form-outline ">
          <input
            className='form-control p-2 '
            type="search"
            placeholder="Search Product Name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <button type="button" className="btn btn-primary btn-sm h-70">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className='d-flex '>
        <div className=" filter d-inline-block " >
          <div className=' col-lg-6 '>
            <button className="btn  p-3 m-3  w-100" onClick={() => setData(products)}>ALL</button>
            <button className="btn  p-3 m-3  w-100" onClick={() => filterResult('Drinks')}>Drinks</button>
            <button className="btn  p-3 m-3  w-100" onClick={() => filterResult('Fruits')}>Fruits</button>
            <button className="btn  p-3 m-3  w-100" onClick={() => filterResult('Vegitabels')}>Vegitabels</button>
            <button className="btn  p-3 m-3  w-100" onClick={() => filterResult('Bakery')}>Bakery</button>
          </div>
        </div>
        <div className='col-lg-8 d-inline-block'>
          {isLoading ? <div className='Spinner'><Spinner color1="blue" color2="#fff" textColor="rgba(0,0,0, 0.5)" /></div> :
            <div className='row'>
              {productList.map((product, key) =>
                <div key={key} className='col-lg-3 mb-4 '>
                  <div className='pos-item  text-center border Larger shadow rounded' >
                    <h4>{product.name}</h4>
                    <img src={product.image} className="img-fluid" alt={product.name} />
                    <p>${product.price}</p>
                    <button className='btn btn-primary mb-3' onClick={() => addProductToCart(product)} ><i className="fa-solid fa-plus"></i>{""} Add To Cart</button>
                  </div>
                </div>
              )
              }
            </div>}
        </div>
      </div>

    </MainLayout>
  )
}


export default POSPage


