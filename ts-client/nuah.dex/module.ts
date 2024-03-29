// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgSendBuyOrder } from "./types/nuah/dex/tx";
import { MsgSendCreatePair } from "./types/nuah/dex/tx";
import { MsgSendSellOrder } from "./types/nuah/dex/tx";

import { BuyOrderBook as typeBuyOrderBook} from "./types"
import { DenomTrace as typeDenomTrace} from "./types"
import { OrderBook as typeOrderBook} from "./types"
import { Order as typeOrder} from "./types"
import { DexPacketData as typeDexPacketData} from "./types"
import { NoData as typeNoData} from "./types"
import { CreatePairPacketData as typeCreatePairPacketData} from "./types"
import { CreatePairPacketAck as typeCreatePairPacketAck} from "./types"
import { SellOrderPacketData as typeSellOrderPacketData} from "./types"
import { SellOrderPacketAck as typeSellOrderPacketAck} from "./types"
import { BuyOrderPacketData as typeBuyOrderPacketData} from "./types"
import { BuyOrderPacketAck as typeBuyOrderPacketAck} from "./types"
import { Params as typeParams} from "./types"
import { SellOrderBook as typeSellOrderBook} from "./types"

export { MsgSendBuyOrder, MsgSendCreatePair, MsgSendSellOrder };

type sendMsgSendBuyOrderParams = {
  value: MsgSendBuyOrder,
  fee?: StdFee,
  memo?: string
};

type sendMsgSendCreatePairParams = {
  value: MsgSendCreatePair,
  fee?: StdFee,
  memo?: string
};

type sendMsgSendSellOrderParams = {
  value: MsgSendSellOrder,
  fee?: StdFee,
  memo?: string
};


type msgSendBuyOrderParams = {
  value: MsgSendBuyOrder,
};

type msgSendCreatePairParams = {
  value: MsgSendCreatePair,
};

type msgSendSellOrderParams = {
  value: MsgSendSellOrder,
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
		
		async sendMsgSendCreatePair({ value, fee, memo }: sendMsgSendCreatePairParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgSendCreatePair: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgSendCreatePair({ value: MsgSendCreatePair.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgSendCreatePair: Could not broadcast Tx: '+ e.message)
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
		
		
		msgSendBuyOrder({ value }: msgSendBuyOrderParams): EncodeObject {
			try {
				return { typeUrl: "/nuah.dex.MsgSendBuyOrder", value: MsgSendBuyOrder.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSendBuyOrder: Could not create message: ' + e.message)
			}
		},
		
		msgSendCreatePair({ value }: msgSendCreatePairParams): EncodeObject {
			try {
				return { typeUrl: "/nuah.dex.MsgSendCreatePair", value: MsgSendCreatePair.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSendCreatePair: Could not create message: ' + e.message)
			}
		},
		
		msgSendSellOrder({ value }: msgSendSellOrderParams): EncodeObject {
			try {
				return { typeUrl: "/nuah.dex.MsgSendSellOrder", value: MsgSendSellOrder.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSendSellOrder: Could not create message: ' + e.message)
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
						BuyOrderBook: getStructure(typeBuyOrderBook.fromPartial({})),
						DenomTrace: getStructure(typeDenomTrace.fromPartial({})),
						OrderBook: getStructure(typeOrderBook.fromPartial({})),
						Order: getStructure(typeOrder.fromPartial({})),
						DexPacketData: getStructure(typeDexPacketData.fromPartial({})),
						NoData: getStructure(typeNoData.fromPartial({})),
						CreatePairPacketData: getStructure(typeCreatePairPacketData.fromPartial({})),
						CreatePairPacketAck: getStructure(typeCreatePairPacketAck.fromPartial({})),
						SellOrderPacketData: getStructure(typeSellOrderPacketData.fromPartial({})),
						SellOrderPacketAck: getStructure(typeSellOrderPacketAck.fromPartial({})),
						BuyOrderPacketData: getStructure(typeBuyOrderPacketData.fromPartial({})),
						BuyOrderPacketAck: getStructure(typeBuyOrderPacketAck.fromPartial({})),
						Params: getStructure(typeParams.fromPartial({})),
						SellOrderBook: getStructure(typeSellOrderBook.fromPartial({})),
						
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
			NuahDex: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;