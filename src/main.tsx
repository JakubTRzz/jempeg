import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import App from './App'
import Home from './pages/Home'
import Spotify from './pages/Spotify'
import YouTube from './pages/YouTube'
import Radio from './pages/Radio'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import WebApp from './pages/WebApp'
import Nav from './pages/Nav'
import Phone from './pages/Phone'
import Car from './pages/Car'
import Climate from './pages/Climate'
import Apps from './pages/Apps'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Home /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/spotify', element: <Spotify /> },
    { path: '/youtube', element: <YouTube /> },
    { path: '/radio', element: <Radio /> },
    { path: '/settings', element: <Settings /> },
    { path: '/web/spotify', element: <WebApp url="https://open.spotify.com/" /> },
    { path: '/web/youtube', element: <WebApp url="https://m.youtube.com/" /> },
    { path: '/nav', element: <Nav /> },
    { path: '/phone', element: <Phone /> },
    { path: '/car', element: <Car /> },
    { path: '/climate', element: <Climate /> },
    { path: '/apps', element: <Apps /> }
  ]}
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
