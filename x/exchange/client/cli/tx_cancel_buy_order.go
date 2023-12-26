package cli

import (
	"strconv"

	"nuah/x/exchange/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdCancelBuyOrder() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "cancel-buy-order [amount-denom] [price-denom] [order-id]",
		Short: "Cancel a buy order",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argAmountDenom := args[0]
			argPriceDenom := args[1]
			argOrderID, err := cast.ToInt32E(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCancelBuyOrder(
				clientCtx.GetFromAddress().String(),
				argAmountDenom,
				argPriceDenom,
				argOrderID,
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
