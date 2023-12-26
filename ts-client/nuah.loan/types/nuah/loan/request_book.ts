/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { RequestBookItem } from "./request";

export const protobufPackage = "nuah.loan";

export interface RequestBook {
  index: string;
  book: RequestBookItem | undefined;
}

function createBaseRequestBook(): RequestBook {
  return { index: "", book: undefined };
}

export const RequestBook = {
  encode(message: RequestBook, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.book !== undefined) {
      RequestBookItem.encode(message.book, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestBook {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestBook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.book = RequestBookItem.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestBook {
    return {
      index: isSet(object.index) ? String(object.index) : "",
      book: isSet(object.book) ? RequestBookItem.fromJSON(object.book) : undefined,
    };
  },

  toJSON(message: RequestBook): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.book !== undefined && (obj.book = message.book ? RequestBookItem.toJSON(message.book) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestBook>, I>>(object: I): RequestBook {
    const message = createBaseRequestBook();
    message.index = object.index ?? "";
    message.book = (object.book !== undefined && object.book !== null)
      ? RequestBookItem.fromPartial(object.book)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
