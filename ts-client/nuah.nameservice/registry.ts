import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgSetName } from "./types/nuah/nameservice/tx";
import { MsgCheckName } from "./types/nuah/nameservice/tx";
import { MsgTransferName } from "./types/nuah/nameservice/tx";
import { MsgDeleteName } from "./types/nuah/nameservice/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/nuah.nameservice.MsgSetName", MsgSetName],
    ["/nuah.nameservice.MsgCheckName", MsgCheckName],
    ["/nuah.nameservice.MsgTransferName", MsgTransferName],
    ["/nuah.nameservice.MsgDeleteName", MsgDeleteName],
    
];

export { msgTypes }