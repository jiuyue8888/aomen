module.exports = {
   
	  module: {
	          rules: [{
	              test: /\.less$/,
	              use: ['style-loader', 'css-loader', 'less-loader', {
	                  loader: 'style-resources-loader',
	                  options: {
	                      patterns: path.resolve(__dirname, 'path/to/less/variables/*.less'),
	                      injector: 'append'
	                  }
	              }]
	          }]
	      },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}