package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"

	// channelutils "github.com/cosmos/ibc-go/v7/modules/core/04-channel/client/utils"
	"nuah/x/exchange/types"

	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdSendSellOrder() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "send-sell-order [amount-denom] [amount] [price-denom] [price]",
		Short: "Send a sell-order over IBC",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			creator := clientCtx.GetFromAddress().String()

			argAmountDenom := args[0]
			argAmount, err := cast.ToInt32E(args[1])
			if err != nil {
				return err
			}
			argPriceDenom := args[2]
			argPrice, err := cast.ToInt32E(args[3])
			if err != nil {
				return err
			}

			// Get the relative timeout timestamp
			timeoutTimestamp, err := cmd.Flags().GetUint64(flagPacketTimeoutTimestamp)
			if err != nil {
				return err
			}

			msg := types.NewMsgSendSellOrder(creator, timeoutTimestamp, argAmountDenom, argAmount, argPriceDenom, argPrice)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().Uint64(flagPacketTimeoutTimestamp, DefaultRelativePacketTimeoutTimestamp, "Packet timeout timestamp in nanoseconds. Default is 10 minutes.")
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
