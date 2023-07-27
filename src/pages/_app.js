import { ChakraProvider } from '@chakra-ui/react'
import { DataContextProvider } from "../context/DataContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <DataContextProvider>
      <Component {...pageProps} />
    </DataContextProvider>
    </ChakraProvider>
  )
}