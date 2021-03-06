module.exports = {
  pages: {
    index: {
        entry: 'src/main-sender.js',
        template: 'public/index.html'
    },
    receiver: {
        entry: 'src/main-receiver.js',
        template: 'public/receiver.html'
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/mediacast/'
    : '/'
}