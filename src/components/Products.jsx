import { Badge, Button, Drawer, IconButton } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Products = () => {

    const [products, setProducts] = useState([])

    const [cart, setCart] = useState([])

    const [open, setOpen] = useState(false)

    const fetchData = async () => {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setProducts(data)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const addCart = (i) => {

        const found = cart.find(product => product.id === i.id)

        if (!found) {
            setCart([...cart, i])

            toast.success(`Cartga qo'shildi`, {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
        } else {
            toast.error(`Bu oldindan mavjud`, {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }

    const deleteCard = (id) => {
        setCart(cart => cart.filter(i => i.id !== id))

        toast.success(`Product o'chirildi`, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <div>

            <div className="flex justify-between items-center py-10">
                <a className='text-2xl font-bold' href="#">Logo</a>


                <Badge content={cart.length}>
                    <IconButton onClick={() => setOpen(!open)}>
                        <i className='bi bi-cart2'></i>
                    </IconButton>
                </Badge>
            </div>

            <div className='grid grid-cols-4 gap-5'>
                {products.map(i => {
                    return (
                        <div key={i.id} className='border border-gray-400 p-4 flex flex-col rounded-xl'>
                            <div className='flex-grow'>
                                <img className='h-60 mx-auto' src={i.image} alt="product" />
                            </div>
                            <div className="body pt-5">
                                <h3>{i.title}</h3>
                            </div>
                            <div className="footer mt-5">
                                <Button onClick={() => addCart(i)} fullWidth>Add to card</Button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Drawer placement="right"
                size={400}
                open={open} className="p-4">
                <div className="flex justify-between items-center py-5">
                    <h3>Drawer</h3>

                    <button onClick={() => setOpen(false)}>
                        <i className="bi bi-x text-2xl"></i>
                    </button>
                </div>

                <ul className='space-y-3'>
                    {cart.map(product => {
                        return (
                            <li className='flex border border-gray-400 rounded-md p-2 items-center relative' key={product.id}>
                                <img className='w-16' src={product.image} alt="product img" />
                                <h3 className='ml-2'>{product.title}</h3>

                                <button onClick={() => deleteCard(product.id)} className='absolute top-2 right-2'>
                                    <i className='bi bi-x'></i>
                                </button>
                            </li>
                        )
                    })}
                </ul>

            </Drawer>
        </div>
    )
}

export default Products