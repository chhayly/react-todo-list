# Todo App
![image](https://user-images.githubusercontent.com/5591764/123505571-1620a080-d68a-11eb-9978-215345fe2c22.png)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment

### Vercel Deployment

This project uses Node.js 24.x. Due to OpenSSL compatibility changes in Node.js 17+, `react-scripts@4.0.3` (webpack 4) requires the `NODE_OPTIONS=--openssl-legacy-provider` environment variable to build successfully.

#### Setting up Vercel Environment Variable

To fix the `ERR_OSSL_EVP_UNSUPPORTED` error on Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new environment variable:
   - **Name**: `NODE_OPTIONS`
   - **Value**: `--openssl-legacy-provider`
   - **Environment**: Select all (Production, Preview, Development)
4. Redeploy your application

#### Local Development

For local development with Node.js 24.x, run:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

**Note**: For long-term maintainability, consider upgrading to `react-scripts@5.x` which has full support for modern Node.js versions without requiring the legacy provider flag.


