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

This project uses Node.js 16.x which is compatible with `react-scripts@4.0.3`. If you encounter OpenSSL-related build errors on Vercel or other platforms using newer Node versions, you can set the following environment variable:

```
NODE_OPTIONS=--openssl-legacy-provider
```

**Note**: The recommended approach is to use Node.js 16.x as specified in `.nvmrc` and `package.json` engines field. Vercel will automatically detect and use the correct Node version from these configuration files.


