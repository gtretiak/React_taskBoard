## CORS and Preflight

CORS stands for Cross-Origin Resource Sharing.

Origin consists of a scheme, a host and a port.

The frontend and backend run on different origins during development:

- React with Vite runs on localhost:5173
- while the API runs on localhost:3000.

So the scheme (http) and the host (localhost) are the same, but ports are different.

Since ports are different, the browser considers them as two different origins (even though they run on the same machine). In other words, the browser enables the communication between two origins.

Before actually sending some not simple cross-origin requests, the browser first sends an automatic OPTIONS request called a preflight request. The preflight request is performed automatically. By doing this it asks the backend whether a certain frontend port, a method and headers are allowed or not.

The backend responds with CORS headers saying yes or no:

- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers

Once the backend allows requests coming from the frontend, the preflight is considered successful and the browser sends the actual API request.
