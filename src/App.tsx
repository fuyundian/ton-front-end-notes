import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import WebApp from '@twa-dev/sdk'
function App() {
  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest
  } = useMainContract();
  const { connected } = useTonConnect()

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>{WebApp.platform}</b>
          <b>合约地址</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>合约余额</b>
          <div className='Hint'>{balance ? balance / 1000000000 : 0} TON</div>
          <b>发送地址</b>
          <div className='Hint'>{recent_sender?.toString()} </div>
          <b>所有者地址</b>
          <div className='Hint'>{owner_address?.toString()}</div>
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>
        {connected && (
          <a
            onClick={() => {
              showAlert();
            }}
          >
            显示预警
          </a>
        )}
        <br />
        {connected && (
          <a
            onClick={() => {
              sendIncrement();
            }}
          >
            计数+1
          </a>
        )}
        <br />
        {connected && (
          <a
            onClick={() => {
              sendDeposit();
            }}
          >
            存入1TON
          </a>
        )}
        <br />
        {connected && (
          <a
            onClick={() => {
              sendWithdrawalRequest();
            }}
          >
            取款1TON
          </a>
        )}

      </div>
    </div>
  );
}

export default App;