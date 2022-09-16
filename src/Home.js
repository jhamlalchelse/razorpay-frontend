import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import Cart from './Cart'
import axios from 'axios'
import laptop  from './images/laptop.jpg'
import mobile  from './images/mobile.jpg'
import avatar  from './images/avatar.jpg'

const Home = () => {
    const checkoutHandler = async(amount)=>{
        const {data:{key}} = await axios.get('http://localhost:4000/api/getkey')
        const {data:{order}} = await axios.post('http://localhost:4000/api/checkout',{
            amount
        })
        const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Jhamlal",
        description: "Test Transaction",
        image: {avatar},
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `http://localhost:4000/api/paymentverification`,
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
            },
        notes: {
            address: "Razorpay Corporate Office"
            },
        theme: {
            color: "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }
  return (
    <>
    <Box>
        <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "row"]}>
            <Cart amount={72000} img={laptop} checkoutHandler={checkoutHandler} />
            <Cart amount={60000} img={mobile} checkoutHandler={checkoutHandler} />
        </Stack>
    </Box>
    </>
  )
}

export default Home