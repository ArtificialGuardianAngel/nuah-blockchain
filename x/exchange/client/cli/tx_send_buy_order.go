package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"nuah/x/exchange/types"
)

var _ = strconv.Itoa(0)

func CmdSendBuyOrder() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "send-buy-order [amount-denom] [amount] [price-denom] [price]",
		Short: "Broadcast message send-buy-order",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argAmountDenom := args[0]
			argAmount := args[1]
			argPriceDenom := args[2]
			argPrice := args[3]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgSendBuyOrder(
				clientCtx.GetFromAddress().String(),
				argAmountDenom,
				argAmount,
				argPriceDenom,
				argPrice,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
