package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"nuah/x/exchange/types"
)

var _ = strconv.Itoa(0)

func CmdGetSentOrders() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "get-sent-orders [from] [amount-denom] [price-denom]",
		Short: "Query get-sent-orders",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			reqFrom := args[0]
			reqAmountDenom := args[1]
			reqPriceDenom := args[2]

			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryGetSentOrdersRequest{

				From:        reqFrom,
				AmountDenom: reqAmountDenom,
				PriceDenom:  reqPriceDenom,
			}

			res, err := queryClient.GetSentOrders(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
