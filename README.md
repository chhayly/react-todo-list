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

This project currently uses Node.js 16.x for compatibility with `react-scripts@4.0.3`. 

**⚠️ Note**: Node.js 16.x reached End of Life in September 2023. This is a temporary workaround to ensure builds work reliably. For long-term maintainability, consider upgrading to `react-scripts@5.x` which supports Node.js 18.x and 20.x (current LTS versions).

If you encounter OpenSSL-related build errors on Vercel or other platforms using newer Node versions, you can set the following environment variable:

```
NODE_OPTIONS=--openssl-legacy-provider
```

**Note**: Vercel will automatically detect and use the correct Node version from `.nvmrc` and `package.json` engines field.


