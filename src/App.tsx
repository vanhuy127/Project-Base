import { AppRouter } from "@/router/appRouter"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
const queryClient = new QueryClient();

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Toaster duration={3000} />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
