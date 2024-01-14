import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateRequest } from "./types/nuah/loan/tx";
import { MsgCreateRequestBook } from "./types/nuah/loan/tx";
import { MsgAcceptRequest } from "./types/nuah/loan/tx";
import { MsgDeclineRequest } from "./types/nuah/loan/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/nuah.loan.MsgCreateRequest", MsgCreateRequest],
    ["/nuah.loan.MsgCreateRequestBook", MsgCreateRequestBook],
    ["/nuah.loan.MsgAcceptRequest", MsgAcceptRequest],
    ["/nuah.loan.MsgDeclineRequest", MsgDeclineRequest],
    
];

export { msgTypes }