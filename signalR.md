1. 文档 https://docs.microsoft.com/zh-cn/aspnet/core/tutorials/signalr-typescript-webpack?source=recommendations&view=aspnetcore-6.0&tabs=visual-studio-code

```tsx
// 文件1
import * as SignalR from "@microsoft/signalr";

const hubConnectionState = atom<SignalR.HubConnection>({
  key: "hubConnectionState",
  default: selector({
    key: "hubConnectionState/default",
    dangerouslyAllowMutability: true,
    get: ({ get }) => {
      const accessTokenFactory = get(accessTokenFactoryState);
      const hubConnection = new SignalR.HubConnectionBuilder()
        // eslint-disable-next-line no-underscore-dangle
        .withUrl(`${_profile.apiServer}/api/communicationhub`, {
          accessTokenFactory: () => {
            return accessTokenFactory?.token ?? "";
          },
        })
        .withAutomaticReconnect()
        .build();
      hubConnection.keepAliveIntervalInMilliseconds = 1000 * 1000 * 2;
      hubConnection.serverTimeoutInMilliseconds = 1000 * 1000 * 4;
      return hubConnection;
    },
  }),
  dangerouslyAllowMutability: true,
});

// 文件2
import { HubConnectionState } from "@microsoft/signalr";

// 全局通知
const messageNotifiedCallback = useMemo(
  () =>
    memoize((params: UserMessage) => {
      const _params = getNotificationConfig(params);
      if (!_params) return;
      const { type, ...config } = _params;
      notification.open({
        ...config,
        duration: null,
        icon: type ? messageNotifiedStatusMap[type] : undefined,
        btn: config.exportId ? (
          <a
            href={`${window._settings.apiServer}/api/platform/exportfile/${config?.exportId}?access_token=${user?.token}`}
          >
            <Button type="primary" size="small">
              下载
            </Button>
          </a>
        ) : undefined,
      });
      // 刷新 消息列表
      matchMutate(new RegExp(`${MESSAGE_URL}`));
    }),
  [matchMutate, user?.token]
);
const startSignalR = useCallback(async () => {
  if (hubConnection.state === HubConnectionState.Disconnected) {
    await hubConnection.start();
  }

  if (hubConnection.state === HubConnectionState.Connected) {
    // 连接
    await hubConnection.invoke("SubscribeTenantEvent", params);
  }
}, [hubConnection, tenantData?.id]);

useEffect(() => {
  startSignalR();

  // 监听事件
  hubConnection.on("MessageNotified", messageNotifiedCallback);

  hubConnection.onclose(async () => {
    // 重启
    // Delay for 1 ~ 5 seconds which is from the robot side practice.
    await new Promise((r) => setTimeout(r, random(1, 5, false) * 1000));
    await hubConnection.start();
  });

  return function cleanup() {
    if (hubConnection.state === HubConnectionState.Connected) {
      // 断开
      hubConnection.invoke("UnsubscribeTenantEvent", params);
    }
  };
}, [
  hubConnection,
  messageNotifiedCallback,
  startSignalR,
  tenantData?.id,
  user?.token,
]);
```
