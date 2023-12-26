package types

import (
	// "errors"
	"errors"
	"sort"
)

func NewRequestItem() RequestBookItem {
	return RequestBookItem{
		IdCount: 0,
	}
}

type Ordering int

const (
	Increasing Ordering = iota
	Decreasing
)

func (book *RequestBookItem) appendRequest(creator string, amount int32, denom string, ordering Ordering) (int32, error) {
	// Initialize the order
	var order Request
	order.Id = book.GetNextOrderID()
	order.Creator = creator
	order.Amount = amount
	order.Denom = denom
	order.Accepted = -1

	// Increment ID tracker
	book.IncrementNextOrderID()

	// Insert the order
	book.insertOrder(order, ordering)
	return order.Id, nil
}

func (book RequestBookItem) GetNextOrderID() int32 {
	return book.IdCount
}

func (book *RequestBookItem) IncrementNextOrderID() {
	// Even numbers to have different ID than buy orders
	book.IdCount++
}

func (book *RequestBookItem) updateAccepted(accepted int32, id int32) (int32, error) {
	var index = -1
	for i, v := range book.Requests {
		if v.Id == id {
			index = i
		}
	}

	if index == -1 {
		return -1, errors.New("index out of range")
	}

	book.Requests[index].Accepted = accepted

	return book.Requests[index].Id, nil
}

func (book *RequestBookItem) insertOrder(request Request, ordering Ordering) {
	if len(book.Requests) > 0 {
		var i int

		// get the index of the new order depending on the provided ordering
		if ordering == Increasing {
			i = sort.Search(len(book.Requests), func(i int) bool { return book.Requests[i].Amount > request.Amount })
		} else {
			i = sort.Search(len(book.Requests), func(i int) bool { return book.Requests[i].Amount < request.Amount })
		}

		// insert order
		orders := append(book.Requests, &request)
		copy(orders[i+1:], orders[i:])
		orders[i] = &request
		book.Requests = orders
	} else {
		book.Requests = append(book.Requests, &request)
	}
}
