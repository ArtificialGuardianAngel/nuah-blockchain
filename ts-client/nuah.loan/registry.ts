import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateRequestBook } from "./types/nuah/loan/tx";
import { MsgCreateRequest } from "./types/nuah/loan/tx";
import { MsgDeclineRequest } from "./types/nuah/loan/tx";
import { MsgAcceptRequest } from "./types/nuah/loan/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/nuah.loan.MsgCreateRequestBook", MsgCreateRequestBook],
    ["/nuah.loan.MsgCreateRequest", MsgCreateRequest],
    ["/nuah.loan.MsgDeclineRequest", MsgDeclineRequest],
    ["/nuah.loan.MsgAcceptRequest", MsgAcceptRequest],
    
];

export { msgTypes }