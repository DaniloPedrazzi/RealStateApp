import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, Button } from '@chakra-ui/react'

import { baseUrl, fetchApi } from '../utils/fetchApi'
import Property from '../components/Property'

const Banner = ({ imageUrl, purpose, title1, title2, desc1, desc2, linkName, buttonText }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner"/>
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1}<br/>{title2}</Text>
      <Text color="gray.700" fontSize="lg" paddingBottom="3" paddingTop="3">{desc1}<br/>{desc2}</Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertyForSale, propertyForRent }) {
  return (
    <Box>
      <Banner 
        purpose="ALUGUE UMA CASA"
        title1="Alugue casas para"
        title2="Todos"
        desc1="Explore Apartamentos, KitNets, Casas"
        desc2="E mais"
        buttonText="Explore Alugueis"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap">
        {propertyForRent.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
      <Banner 
        purpose="COMPRE UMA CASA"
        title1="Ache, Compre e Tenha sua"
        title2="Casa dos Sonhos"
        desc1="Explore Apartamentos, KitNets, Casas"
        desc2="E mais"
        buttonText="Explore Compras"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap="wrap">
        {propertyForSale.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
    </Box>
  )
}

export async function getStaticProps(){
  //Pega a data da API
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)
  //Passa essa data pro componente em forma de props
  return {
    props: {
      propertyForSale: propertyForSale?.hits,
      propertyForRent: propertyForRent?.hits,
    }
  }
}
