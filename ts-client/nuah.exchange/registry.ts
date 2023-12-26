import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCancelSellOrder } from "./types/nuah/exchange/tx";
import { MsgSendCreatePair } from "./types/nuah/exchange/tx";
import { MsgSendBuyOrder } from "./types/nuah/exchange/tx";
import { MsgSendSellOrder } from "./types/nuah/exchange/tx";
import { MsgCancelBuyOrder } from "./types/nuah/exchange/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/nuah.exchange.MsgCancelSellOrder", MsgCancelSellOrder],
    ["/nuah.exchange.MsgSendCreatePair", MsgSendCreatePair],
    ["/nuah.exchange.MsgSendBuyOrder", MsgSendBuyOrder],
    ["/nuah.exchange.MsgSendSellOrder", MsgSendSellOrder],
    ["/nuah.exchange.MsgCancelBuyOrder", MsgCancelBuyOrder],
    
];

export { msgTypes }