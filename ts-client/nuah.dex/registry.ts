import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgSendBuyOrder } from "./types/nuah/dex/tx";
import { MsgSendCreatePair } from "./types/nuah/dex/tx";
import { MsgSendSellOrder } from "./types/nuah/dex/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/nuah.dex.MsgSendBuyOrder", MsgSendBuyOrder],
    ["/nuah.dex.MsgSendCreatePair", MsgSendCreatePair],
    ["/nuah.dex.MsgSendSellOrder", MsgSendSellOrder],
    
];

export { msgTypes }