import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Layout from './components/Layout';
import { Api } from './api/Api';
import { NotFoundPage } from './pages/NotFound';
import { IndexPage } from './pages/Index';
import { LibraryPage } from './pages/Library';

export type ContextType = {
  api: Api;
};

export const NyContext = React.createContext<ContextType | null>(null);

export default function App() {
  const [api] = useState<Api>(new Api());
  return (
    <>
      <NyContext.Provider value={{ api: api }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="Library" element={<LibraryPage />} />
            {/*<Route path="Tmp/:text" element={<IndexPage what="Categorie" />} />*/}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </NyContext.Provider>
    </>
  )
}