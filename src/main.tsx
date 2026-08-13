import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import SixMonths from './pages/SixMonths.tsx';
import { HeroUIProvider } from '@heroui/react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<HeroUIProvider>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/six-months" element={<SixMonths />} />
					</Routes>
				</HeroUIProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
