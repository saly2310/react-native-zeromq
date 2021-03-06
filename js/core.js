import {
  DeviceEventEmitter,
  NativeAppEventEmitter,
  NativeModules,
  Platform
} from 'react-native';

const ReactNativeZeroMQAndroid = NativeModules.ReactNativeZeroMQAndroid;

let bridge = null;
let notification_listeners = [];

let call_notification_listeners = function (notification) {
  var i = notification_listeners.length - 1;

  for (i; i >= 0; i--) {
    notification_listeners[i](notification);
  }
};

switch (Platform.OS) {
  case 'android':
    bridge = ReactNativeZeroMQAndroid;
    DeviceEventEmitter.addListener('redis.event', (notification) => {
      notification = (notification && notification.result);
      call_notification_listeners(notification);
    });
    break;
}

export default {
  bridge: bridge,
  notificationListeners: notification_listeners
}
