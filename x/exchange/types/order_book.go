package types

import (
	"errors"
	"sort"
)

func NewOrderBook() OrderBook {
	return OrderBook{
		IdCount: 0,
	}
}

const (
	MaxAmount = uint64(100_000_000_000)
	MaxPrice  = uint64(100_000_000_000)
)

type Ordering int

const (
	Increasing Ordering = iota
	Decreasing
)

var (
	ErrMaxAmount     = errors.New("max amount reached")
	ErrMaxPrice      = errors.New("max price reached")
	ErrZeroAmount    = errors.New("amount is zero")
	ErrZeroPrice     = errors.New("price is zero")
	ErrOrderNotFound = errors.New("order not found")
)

func (book *OrderBook) appendOrder(creator string, amount uint64, price uint64, ordering Ordering) (int32, error) {
	if err := checkAmountAndPrice(amount, price); err != nil {
		return 0, err
	}

	// Initialize the order
	var order Order
	order.Id = book.GetNextOrderID()
	order.Creator = creator
	order.Amount = amount
	order.Price = price

	// Increment ID tracker
	book.IncrementNextOrderID()

	// Insert the order
	book.insertOrder(order, ordering)
	return order.Id, nil
}

func checkAmountAndPrice(amount uint64, price uint64) error {
	if amount == uint64(0) {
		return ErrZeroAmount
	}
	if amount > MaxAmount {
		return ErrMaxAmount
	}

	if price == uint64(0) {
		return ErrZeroPrice
	}
	if price > MaxPrice {
		return ErrMaxPrice
	}

	return nil
}
func (book OrderBook) GetNextOrderID() int32 {
	return book.IdCount
}
func (book *OrderBook) IncrementNextOrderID() {
	// Even numbers to have different ID than buy orders
	book.IdCount++
}
func (book *OrderBook) insertOrder(order Order, ordering Ordering) {
	if len(book.Orders) > 0 {
		var i int

		// get the index of the new order depending on the provided ordering
		// fmt.Printf("%+v\n", ordering == Increasing)
		if ordering == Increasing {
			i = sort.Search(len(book.Orders), func(i int) bool { return book.Orders[i].Price > order.Price })
		} else {
			i = sort.Search(len(book.Orders), func(i int) bool { return book.Orders[i].Price < order.Price })
		}

		// insert order
		orders := append(book.Orders, &order)
		copy(orders[i+1:], orders[i:])
		orders[i] = &order
		book.Orders = orders
	} else {
		book.Orders = append(book.Orders, &order)
	}
}
