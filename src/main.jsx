// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.jsx';
import './styles/index.scss';

// 쿼리키, 서버데이터와의 차이점을 구분, 모든 컴포넌트가 공유
const qeuryClient = new QueryClient();

// 마스터컴포넌트(App)를 돔형태로 구현해서 index.html의 #root요소안에 넣어줌
createRoot(document.getElementById('root')).render(
	// <StrictMode>
	<QueryClientProvider client={qeuryClient}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
	// </StrictMode>
);
