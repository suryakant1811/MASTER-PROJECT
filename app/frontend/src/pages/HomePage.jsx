import { Container, VStack, Text,  SimpleGrid} from '@chakra-ui/react'
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ui/ProductCard'
import axios from "axios"
const HomePage = () => {

  const {fetchProducts, products} = useProductStore()
  const [value, setValue] = useState()
  useEffect( () => {
    fetchProducts()
  }, [fetchProducts] );
console.log( products);

  const getNumberOfItem = async(req, res) => {
    try {
      const data = await axios.get("/api/products/count")
      setValue(data)
    } catch (error) {
      return res.console.log(error)
    }
  }

  useEffect( () => {getNumberOfItem()},[])

  return (
    <Container maxW={'container.xl'} py={12}>
      
    <VStack spacing={8}>

   <Text fontSize={30}  fontWeight={"bold"}  textAlign={"Center"}  >
      Current Products are...... {value}
      
   </Text>


    <SimpleGrid 
     columns={{
      base:1,
      md:2,
      lg:3
     }}
     spacing={10}
     w={"full"}
    >

     {products.map((product) => (
      <ProductCard key={product._id} product = {product}/>
     ) )}

    </SimpleGrid>


     {products.length === 0 && (
      <Text fontSize={30}  fontWeight={"bold"}  textAlign={"Center"}  >
      No Products found 😢{" "}
      <Link to={"/create"}>
      <Text as={"span"} color={"blue.500"}>
        Create a product
      </Text>
      </Link>
   </Text>
     )}

    </VStack>

    </Container>
  )
}

export default HomePage
// HomePage.jsx

