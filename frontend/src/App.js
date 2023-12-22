import { RouterProvider } from "react-router-dom";
import {router} from "./router";
import { ChakraProvider, theme } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
