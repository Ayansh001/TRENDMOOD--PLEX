
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MoodPage from "./pages/MoodPage";
import ChatPage from "./pages/ChatPage";
import TrendingPage from "./pages/TrendingPage";
import WatchlistPage from "./pages/WatchlistPage";
import DetailsPage from "./pages/DetailsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mood" element={<MoodPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
