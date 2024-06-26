import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract, toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

export function useMainContract() {
    const client = useTonClient();
    const { sender } = useTonConnect();
    const [contractData, setContractData] = useState<null | {
        counter_value: number;
        recent_sender: Address;
        owner_address: Address;
    }>();
    const [balance, setBalance] = useState<null | number>();
    const mainContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = new MainContract(
            Address.parse("kQDxQ2F_Ob3XvPja01LLky3XPg-us_Wwp9JFbgGKQgL6kDDN") // replace with your address from tutorial 2 step 8
        );
        return client.open(contract) as OpenedContract<MainContract>;
    }, [client]);
    useEffect(() => {
        async function getValue() {
            if (!mainContract) return;
            setContractData(null);
            const val = await mainContract.getData();
            setContractData({
                counter_value: val.number,
                recent_sender: val.recent_sender,
                owner_address: val.owner_address,
            });
            const balanceValue = await mainContract.getBalance();
            setBalance(balanceValue.number)
        }
        getValue();
    }, [mainContract]);

    return {
        contract_address: mainContract?.address.toString(),
        ...contractData,
        balance,
        sendIncrement: () => {
            return mainContract?.sendIncrement(sender, toNano(0.05), 3);
        },
        sendDeposit: () => {
            return mainContract?.sendDeposit(sender, toNano("1"),);
        },
        sendWithdrawalRequest: () => {
            return mainContract?.sendWithdrawalRequest(sender, toNano("0.05"), toNano("1"));
        },
    };
}
