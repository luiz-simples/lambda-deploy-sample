global.window = {
  navigator: {onLine: true},
  addEventListener: function () {}
}

require('isomorphic-fetch')
const gql = require('graphql-tag')
const AWSAppSyncClient = require('aws-appsync').default

const query = gql(`
query ListEvents {
  listEvents {
    items {
      id
      name
      where
      when
      description
      comments {
        items {
          commentId
        }
      }
    }
  }
}`)

const appSyncClient = new AWSAppSyncClient({
  url: 'https://dop7axpd5jcqhk2e33yv42rrou.appsync-api.us-west-2.amazonaws.com/graphql',
  region: 'us-west-2',
  auth: {
    type: 'AWS_IAM',
    credentials: {
      accessKeyId: 'AKIAIRHDI7Z3WFFJQ33A',
      secretAccessKey: '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'
    }
  }
})

appSyncClient.hydrated().then(function (client) {
  client.query({query: query}).then(function logData(data) {
    console.log('results of query: ', data)
  }).catch(console.error)
})
