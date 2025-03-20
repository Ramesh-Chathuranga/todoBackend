import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoScreen, NotFoundScreen } from "./pages";
import { Toaster } from 'sonner';

function App() {


  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoScreen />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
        <Toaster />
      </BrowserRouter>

  )
}

export default App
