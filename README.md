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

This project uses Node.js 24.x. Due to OpenSSL compatibility changes in Node.js 17+, `react-scripts@4.0.3` (webpack 4) requires the `NODE_OPTIONS=--openssl-legacy-provider` flag.

The build script in `package.json` now includes this flag automatically, so Vercel deployments should work out of the box.

#### Local Development

For local development with Node.js 24.x:

- **macOS/Linux**: `npm run build` works as-is (the build script includes the required NODE_OPTIONS flag)
- **Windows**: The inline NODE_OPTIONS in the build script won't work. Use:
  ```cmd
  set NODE_OPTIONS=--openssl-legacy-provider && npm run build
  ```
  Or install [cross-env](https://www.npmjs.com/package/cross-env) for cross-platform compatibility.

For the start command on all platforms:
```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

**Note**: For long-term maintainability, consider upgrading to `react-scripts@5.x` which has full support for modern Node.js versions without requiring the legacy provider flag.


