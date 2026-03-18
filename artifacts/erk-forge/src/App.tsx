import { Switch, Route, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

import Home from "@/pages/Home"
import NotFound from "@/pages/not-found"

// Araç Sayfaları
import ToolsHub from "@/pages/ToolsHub"
import BMIPage from "@/pages/BMIPage"
import CaloriePage from "@/pages/CaloriePage"
import OneRMPage from "@/pages/OneRMPage"
import BodyFatPage from "@/pages/BodyFatPage"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  },
})

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/araclar" component={ToolsHub} />
      <Route path="/araclar/bmi" component={BMIPage} />
      <Route path="/araclar/kalori" component={CaloriePage} />
      <Route path="/araclar/1rm" component={OneRMPage} />
      <Route path="/araclar/vucut-analizi" component={BodyFatPage} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App;
