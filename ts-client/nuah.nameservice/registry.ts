import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgDeleteName } from "./types/nuah/nameservice/tx";
import { MsgSetName } from "./types/nuah/nameservice/tx";
import { MsgTransferName } from "./types/nuah/nameservice/tx";
import { MsgCheckName } from "./types/nuah/nameservice/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/nuah.nameservice.MsgDeleteName", MsgDeleteName],
    ["/nuah.nameservice.MsgSetName", MsgSetName],
    ["/nuah.nameservice.MsgTransferName", MsgTransferName],
    ["/nuah.nameservice.MsgCheckName", MsgCheckName],
    
];

export { msgTypes }