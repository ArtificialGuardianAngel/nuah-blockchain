// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgSendBuyOrder } from "./types/nuah/exchange/tx";
import { MsgSendSellOrder } from "./types/nuah/exchange/tx";
import { MsgCreatePair } from "./types/nuah/exchange/tx";

import { OrderBook as typeOrderBook} from "./types"
import { Order as typeOrder} from "./types"
import { Params as typeParams} from "./types"

export { MsgSendBuyOrder, MsgSendSellOrder, MsgCreatePair };

type sendMsgSendBuyOrderParams = {
  value: MsgSendBuyOrder,
  fee?: StdFee,
  memo?: string
};

type sendMsgSendSellOrderParams = {
  value: MsgSendSellOrder,
  fee?: StdFee,
  memo?: string
};

type sendMsgCreatePairParams = {
  value: MsgCreatePair,
  fee?: StdFee,
  memo?: string
};


type msgSendBuyOrderParams = {
  value: MsgSendBuyOrder,
};

type msgSendSellOrderParams = {
  value: MsgSendSellOrder,
};

type msgCreatePairParams = {
  value: MsgCreatePair,
};


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
		
		async sendMsgSendBuyOrder({ value, fee, memo }: sendMsgSendBuyOrderParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgSendBuyOrder: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgSendBuyOrder({ value: MsgSendBuyOrder.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgSendBuyOrder: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgSendSellOrder({ value, fee, memo }: sendMsgSendSellOrderParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgSendSellOrder: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgSendSellOrder({ value: MsgSendSellOrder.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgSendSellOrder: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgCreatePair({ value, fee, memo }: sendMsgCreatePairParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCreatePair: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreatePair({ value: MsgCreatePair.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreatePair: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgSendBuyOrder({ value }: msgSendBuyOrderParams): EncodeObject {
			try {
				return { typeUrl: "/nuah.exchange.MsgSendBuyOrder", value: MsgSendBuyOrder.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSendBuyOrder: Could not create message: ' + e.message)
			}
		},
		
		msgSendSellOrder({ value }: msgSendSellOrderParams): EncodeObject {
			try {
				return { typeUrl: "/nuah.exchange.MsgSendSellOrder", value: MsgSendSellOrder.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSendSellOrder: Could not create message: ' + e.message)
			}
		},
		
		msgCreatePair({ value }: msgCreatePairParams): EncodeObject {
			try {
				return { typeUrl: "/nuah.exchange.MsgCreatePair", value: MsgCreatePair.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreatePair: Could not create message: ' + e.message)
			}
		},
		
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
						OrderBook: getStructure(typeOrderBook.fromPartial({})),
						Order: getStructure(typeOrder.fromPartial({})),
						Params: getStructure(typeParams.fromPartial({})),
						
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
			NuahExchange: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;