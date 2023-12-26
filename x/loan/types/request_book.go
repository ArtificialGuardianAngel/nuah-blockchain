package types

func NewRequestBook() RequestBook {
	book := NewRequestItem()
	return RequestBook{
		Book: &book,
	}
}

func (s *RequestBook) AppendRequest(creator string, amount int32, denom string) (int32, error) {
	return s.Book.appendRequest(creator, amount, denom, Decreasing)
}

func (s *RequestBook) UpdateAcceptedRequest(id int32, isAccepted int32) (int32, error) {
	return s.Book.updateAccepted(isAccepted, id)
}
