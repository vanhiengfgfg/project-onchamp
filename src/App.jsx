import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = route.layout || Fragment;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Layout>{route.element}</Layout>}
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
