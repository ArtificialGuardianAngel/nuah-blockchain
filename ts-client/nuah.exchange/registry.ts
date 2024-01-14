import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgSendBuyOrder } from "./types/nuah/exchange/tx";
import { MsgSendSellOrder } from "./types/nuah/exchange/tx";
import { MsgCreatePair } from "./types/nuah/exchange/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/nuah.exchange.MsgSendBuyOrder", MsgSendBuyOrder],
    ["/nuah.exchange.MsgSendSellOrder", MsgSendSellOrder],
    ["/nuah.exchange.MsgCreatePair", MsgCreatePair],
    
];

export { msgTypes }