import React from "react";
import styled from "styled-components";

const Div = styled.div`
  border: 1px solid #085ff7;
  width: 100%;
  height: 100%;
  margin: auto;
  margin-top: 10px;
  padding: 20px;
  border-radius: 15px;
  -webkit-box-shadow: 0 0 5px #085ff7;
  box-shadow: 0 0 5px #085ff7;
  position: relative;
`;
const Container = styled.div`
  padding-left: 30px;
  color: #085ff7;
`;
const Delete = styled.div`
  position: absolute;
  right: 20px;
  bottom: 10px;
`;
const H1 = styled.h1`
  font-style: italic;
`;
export const MyReviewsListItem = ({
  title,
  text,
  rating,
  reviewer,
  location,
  datetime,
  email,
  company,
  id,
  handleDelete,
}) => {
  return (
    <Div>
      <h1>{company}</h1>
      <H1>{title}</H1>
      <Container>
        <p>Rating : {rating}</p>
        <p>{datetime}</p>
        <p>
          Review by {reviewer} - {location}
        </p>
      </Container>
      <p>{text}</p>
      <Delete onClick={() => handleDelete(id)}>
        <span class="material-icons-outlined">delete</span>
      </Delete>
    </Div>
  );
};
