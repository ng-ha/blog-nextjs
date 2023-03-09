import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise<void>((resolve) => {
    // Convert cookies into header Authorization
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('access_token');

    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    // Dont send cookies to API server
    req.headers.cookie = '';

    // Change origin   http://localhost:3000/api/students ==> https://js-potst-api.herokuapp.com/api/students

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });
    proxy.once('proxyRes', () => {
      resolve();
    });
  });
}
