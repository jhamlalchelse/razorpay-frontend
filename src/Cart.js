import { Button, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Cart = ({img,amount,checkoutHandler}) => {
  return (
    <>
    <VStack>
        <Image src={img} style={{height:"200px", width:"200px"}} />
        <Text>₹{amount}</Text>
        <Button onClick={()=>checkoutHandler(amount)}>Buy Now</Button>
    </VStack>
    </>
  )
}

export default Cart