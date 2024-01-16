#!/usr/bin/sh

cp -r client/proto/* proto
echo "Building types from proto..."

protoc --plugin="../on-chain/node_modules/ts-proto/protoc-gen-ts_proto" \
--ts_proto_out="client/types/generated/" \
--proto_path="proto" \
--ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=messages" \
proto/nuah/**/*.proto \

echo "Done"
rm -rf proto/cosmos
rm -rf proto/gogoproto
rm -rf proto/google
