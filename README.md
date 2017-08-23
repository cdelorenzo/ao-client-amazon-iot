# ao-client-amazon-iot
Amazon IoT MQTT Client Subscribe

## Dependencies
**NOTE:** AWS IoT SDK will only support Node version 4 or above.

You can check your node version by

```sh
node -v
```

- Rename config-default.json to config.json and update config as appropriate

- at the moment you also must have the below set for this work work

```ssh
.aws/credentials
[default]
aws_access_key_id=foo
aws_secret_access_key=bar

```

## Execution

```javascript
    node subscribe.js ipfoo.regionbar
```

#TODO: Get working with Cognito!! As an unauthenticated user

#TODO: Send email to AWS regarding options
host: the AWS IoT endpoint you will use to connect
clientId: the client ID you will use to connect to AWS IoT
certPath: path of the client certificate file
keyPath: path of the private key file associated with the client certificate
caPath: path of your CA certificate file
clientCert: same as certPath, but can also accept a buffer containing client certificate data
privateKey: same as keyPath, but can also accept a buffer containing private key data
caCert: same as caPath, but can also accept a buffer containing CA certificate data
autoResubscribe: set to 'true' to automatically re-subscribe to topics after reconnection (default 'true')
offlineQueueing: set to 'true' to automatically queue published messages while offline default 'true')
offlineQueueMaxSize: enforce a maximum size for the offline message queue (default 0, e.g. no maximum)
offlineQueueDropBehavior: set to 'oldest' or 'newest' to define drop behavior on a full queue when offlineQueueMaxSize > 0
drainTimeMs: the minimum time in milliseconds between publishes when draining after reconnection (default 250)
baseReconnectTimeMs: the base reconnection time in milliseconds (default 1000)
maximumReconnectTimeMs: the maximum reconnection time in milliseconds (default 128000)
minimumConnectionTimeMs: the minimum time in milliseconds that a connection must be maintained in order to be considered stable (default 20000)
protocol: the connection type, either 'mqtts' (default) or 'wss' (WebSocket/TLS). Note that when set to 'wss', values must be provided for the Access Key ID and Secret Key in either the following options or in environment variables as specified in WebSocket Configuration.
websocketOptions: if protocol is set to 'wss', you can use this parameter to pass additional options to the underlying WebSocket object; these options are documented here.
protocol is set to 'wss'. Default value is '~/.aws/credentials'
profile: used to specify which credential profile to be used when protocol is set to 'wss'. Default value is 'default'
accessKeyId: used to specify the Access Key ID when protocol is set to 'wss'. Overrides the environment variable AWS_ACCESS_KEY_ID and AWS_ACCESS_KEY_ID from filename if set.
secretKey: used to specify the Secret Key when protocol is set to 'wss'. Overrides the environment variable AWS_SECRET_ACCESS_KEYand AWS_SECRET_ACCESS_KEY from filename if set.
sessionToken: (required when authenticating via Cognito, optional otherwise) used to specify the Session Token when protocol is set to 'wss'. Overrides the environment variable AWS_SESSION_TOKEN if set.
