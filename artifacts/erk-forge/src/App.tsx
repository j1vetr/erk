import { Switch, Route, Router as WouterRouter, useLocation } from "wouter"
import { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

import Home from "@/pages/Home"
import NotFound from "@/pages/not-found"

import ToolsHub from "@/pages/ToolsHub"
import BMIPage from "@/pages/BMIPage"
import CaloriePage from "@/pages/CaloriePage"
import OneRMPage from "@/pages/OneRMPage"
import BodyFatPage from "@/pages/BodyFatPage"

import BlogListPage from "@/pages/BlogListPage"
import BlogPostPage from "@/pages/BlogPostPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  },
})

function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return null
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/araclar" component={ToolsHub} />
        <Route path="/araclar/bmi" component={BMIPage} />
        <Route path="/araclar/kalori" component={CaloriePage} />
        <Route path="/araclar/1rm" component={OneRMPage} />
        <Route path="/araclar/vucut-analizi" component={BodyFatPage} />
        <Route path="/blog" component={BlogListPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route component={NotFound} />
      </Switch>
    </>
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

export default App
