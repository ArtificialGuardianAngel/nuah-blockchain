// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";

import { Tx as typeTx} from "./types"
import { TxRaw as typeTxRaw} from "./types"
import { SignDoc as typeSignDoc} from "./types"
import { SignDocDirectAux as typeSignDocDirectAux} from "./types"
import { TxBody as typeTxBody} from "./types"
import { AuthInfo as typeAuthInfo} from "./types"
import { SignerInfo as typeSignerInfo} from "./types"
import { ModeInfo as typeModeInfo} from "./types"
import { ModeInfo_Single as typeModeInfo_Single} from "./types"
import { ModeInfo_Multi as typeModeInfo_Multi} from "./types"
import { Fee as typeFee} from "./types"
import { Tip as typeTip} from "./types"
import { AuxSignerData as typeAuxSignerData} from "./types"

export {  };



export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						Tx: getStructure(typeTx.fromPartial({})),
						TxRaw: getStructure(typeTxRaw.fromPartial({})),
						SignDoc: getStructure(typeSignDoc.fromPartial({})),
						SignDocDirectAux: getStructure(typeSignDocDirectAux.fromPartial({})),
						TxBody: getStructure(typeTxBody.fromPartial({})),
						AuthInfo: getStructure(typeAuthInfo.fromPartial({})),
						SignerInfo: getStructure(typeSignerInfo.fromPartial({})),
						ModeInfo: getStructure(typeModeInfo.fromPartial({})),
						ModeInfo_Single: getStructure(typeModeInfo_Single.fromPartial({})),
						ModeInfo_Multi: getStructure(typeModeInfo_Multi.fromPartial({})),
						Fee: getStructure(typeFee.fromPartial({})),
						Tip: getStructure(typeTip.fromPartial({})),
						AuxSignerData: getStructure(typeAuxSignerData.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			CosmosTxV1Beta1: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;