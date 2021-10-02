# Stripe Service

## Requirements

- nodejs

## Getting Started

- `npm install`
- Launch via VSCode Debugger

## Documentation

https://stripe.com/docs/api

## Authorization

There are 2 graphs; private and public.

the private graph is a superset of the public graph. it includes all the public graph plus private queries and mutations.

## Queries

```gql
{
  searchPromotionCodes {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
        id
        code
      }
    }
  }
}
```


```gql
{
  searchProducts {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
        id
        name 
        description
        images
        shippable
        prices {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
              type
              interval
              currency
              amount
              formattedAmount
            }
          }
        }
      }
    }
  }
}
```


```gql
{
  _entities(representations: [{ __typename: "User", id: "1" }]) {
    ... on User {
      id
      charges(input: { first: 5 }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
          }
        }
      }
    }
  }
}
```