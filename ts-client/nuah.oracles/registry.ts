import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateData } from "./types/nuah/oracles/tx";
import { MsgDeleteData } from "./types/nuah/oracles/tx";
import { MsgUpdateData } from "./types/nuah/oracles/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/nuah.oracles.MsgCreateData", MsgCreateData],
    ["/nuah.oracles.MsgDeleteData", MsgDeleteData],
    ["/nuah.oracles.MsgUpdateData", MsgUpdateData],
    
];

export { msgTypes }