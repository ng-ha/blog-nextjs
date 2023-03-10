import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';
type Data = {
  message: string;
};
const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Method not supported' });
  }

  return new Promise<void>((resolve) => {
    // Dont send cookies to API server
    req.headers.cookie = '';

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';

      proxyRes.on('data', (chunk) => {
        body += chunk;
      });

      proxyRes.on('end', function () {
        try {
          console.log('res from proxied server:', body);
          console.log("response's status code: ", proxyRes.statusCode);
          const isSuccess =
            proxyRes.statusCode && proxyRes.statusCode >= 200 && proxyRes.statusCode < 300;
          if (!isSuccess) {
            (res as NextApiResponse).status(proxyRes.statusCode || 500).json(body);
            return resolve();
          }

          const { accessToken, expiredAt } = JSON.parse(body);

          // convert token to cookies
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt),
          });

          (res as NextApiResponse).status(200).json({ message: 'Login Successfully' });
        } catch (error) {
          (res as NextApiResponse).status(500).json({ message: 'Something went wrong' });
        }
        resolve();
      });
    };
    proxy.once('proxyRes', handleLoginResponse);

    // Change origin   http://localhost:3000/api/students ==> https://js-potst-api.herokuapp.com/api/students
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
