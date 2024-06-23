const { join } = require('path');
const { parsed: myEnv } = require('dotenv').config({
    path: join(__dirname, '.env')
});
module.exports = {
    webpack: function (config, { buildId, dev, isServer, defaultLoaders, webpack }) {
        // Add support for environment variables
        config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
        
        // Simplify and correct CSS handling
        // Remove the duplicate and conflicting CSS rules
        // Ensure only one rule for CSS and one for SCSS

        // Consolidated rule for CSS (including CSS modules and node_modules)
        config.module.rules.push({
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            auto: (resourcePath) => !resourcePath.includes('node_modules') && resourcePath.endsWith('.module.css'),
                        },
                    },
                },
                'postcss-loader',
            ],
        });

        // Adjusted rule for SCSS
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            includePaths: [join(__dirname, 'styles')],
                        },
                    },
                },
            ],
        });

        

        // Add support for fonts
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: '[name].[ext]',
                    },
                },
            ],
        });

        // Add support for images
        if (!isServer) {
            config.module.rules.push({
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/_next',
                            name: 'static/images/[hash].[ext]',
                        },
                    },
                ],
            });
        }

        // Add support for utilities
        config.resolve.alias['@utils'] = join(__dirname, 'src/utils/util/index.tsx');

        // Optimization for development mode
        if (dev) {
            // ...
        }

        return config;
    },
};