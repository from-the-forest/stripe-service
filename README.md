# Stripe Service

[![CircleCI](https://circleci.com/gh/from-the-forest/stripe-service/tree/main.svg?style=svg)](https://circleci.com/gh/from-the-forest/stripe-service/tree/main)

> Apollo Federation Subgraph for stripe operations

## Requirements

- nodejs

## Getting Started

- `npm install`
- Launch via VSCode Debugger

## Documentation

https://stripe.com/docs/api

## Diagram

![Diagram](https://lucid.app/documents/view/2559a05c-b1e2-4cc9-89e6-e3a9a3dfb2f5)

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
      subscriptions {
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
      paymentMethods(input: { first: 5 }) {
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

```gql
mutation DeletePaymentMethod {
  deletePaymentMethod(input: { paymentMethodId: "card_1JgBBPGQI8FZmHKGeP11U7ZL" }) {
    id
  }
}
```

```gql
mutation Subscribe {
  subscribe(input: { priceIds: ["price_1Jfui2GQI8FZmHKG3Ul0JqOT"] }) {
    id
  }
}
```

```gql
mutation Unsubscribe {
  unsubscribe(input: { subscriptionId: "sub_1JgBolGQI8FZmHKGXGx1AyIq" }) {
    id
  }
}
```

```gql
{
  createCheckoutSession(input: { mode: "subscription", lineItems: ["price_1Jfui2GQI8FZmHKG3Ul0JqOT"] })
}
```