import axios from 'axios'
import queryString from 'query-string'
import { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } from '../config'

let MUTATION_ID = 0
const getClientMutationID = mutationName => `${mutationName}:${++MUTATION_ID}`

const api = (accessToken, query, variables) =>
  axios
    .post(
      `${API_URL}/graphql`,
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then(({ data }) => {
      if (data.errors) throw data
      return data.data
    })

// Events

export const fetchEvents = (accessToken, params) => {
  const query = `
    query ($name: String) {
      events(name: $name) {
        edges {
          node {
            id
            name
            unit
            value
            remark
          }
        }
      }
    }
  `
  return api(accessToken, query, params).then(r => r.events.edges.map(e => e.node))
}

export const fetchEvent = (accessToken, id) => {
  const query = `
    query ($id: ID!) {
      node(id: $id) {
        id
        ... on Event {
          name
          unit
          value
          remark
        }
      }
    }
  `
  const vars = { id }
  return api(accessToken, query, vars).then(r => r.node)
}

export const insertEvent = (accessToken, values) => {
  const query = `
    mutation ($input: CreateEventInput!) {
      createEvent(input: $input) {
        event {
          id
          name
          unit
          value
          remark
        }
      }
    }
  `
  const vars = {
    input: {
      ...values,
      clientMutationId: getClientMutationID('createEvent'),
    },
  }
  return api(accessToken, query, vars).then(r => r.createEvent.event)
}

export const updateEvent = (accessToken, values) => {
  const query = `
    mutation ($input: UpdateEventInput!) {
      updateEvent(input: $input) {
        event {
          id
          name
          unit
          value
          remark
        }
      }
    }
  `
  const vars = {
    input: {
      ...values,
      clientMutationId: getClientMutationID('updateEvent'),
    },
  }
  return api(accessToken, query, vars).then(r => r.updateEvent.event)
}

export const deleteEvent = (accessToken, id) => {
  const query = `
    mutation ($input: DeleteEventInput!) {
      deleteEvent(input: $input) {
        id
      }
    }
  `
  const vars = {
    input: {
      id,
      clientMutationId: getClientMutationID('deleteEvent'),
    },
  }
  return api(accessToken, query, vars)
}

// Posts

export const fetchPostEvents = (accessToken, params) => {
  const query = `
    query {
      events {
        edges {
          node {
            id
            name
            unit
            value
            lastPerformance {
              value
              set1
              set2
              set3
              set4
              set5
            }
          }
        }
      }
    }
  `
  return api(accessToken, query, params).then(r => r.events.edges.map(e => e.node))
}

export const fetchPosts = (accessToken, params) => {
  const query = `
    query ($name: String) {
      posts(first: 10, performances_Event_Name_Icontains: $name) {
        edges {
          node {
            id
            workoutDate
            performances {
              id
              event {
                id
                name
                unit
              }
              value
              set1
              set2
              set3
              set4
              set5
            }
            remark
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `
  return api(accessToken, query, params).then(({ posts: { edges, pageInfo } }) => ({
    items: edges.map(e => e.node),
    pageInfo,
  }))
}

export const fetchPost = (accessToken, id) => {
  const query = `
    query ($id: ID!) {
      node(id: $id) {
        id
        ... on Post {
          workoutDate
          performances {
            event {
              id
            }
            value
            set1
            set2
            set3
            set4
            set5
          }
          remark
        }
      }
    }
  `
  const vars = { id }
  return api(accessToken, query, vars).then(r => r.node)
}

export const fetchMorePosts = (accessToken, after) => {
  const query = `
    query ($name: String, $after: String) {
      posts(first: 10, performances_Event_Name_Icontains: $name, after: $after) {
        edges {
          node {
            id
            workoutDate
            performances {
              id
              event {
                id
                name
                unit
              }
              value
              set1
              set2
              set3
              set4
              set5
            }
            remark
          }
        },
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `
  const vars = { after }
  return api(accessToken, query, vars).then(({ posts: { edges, pageInfo } }) => ({
    items: edges.map(e => e.node),
    pageInfo,
  }))
}

export const insertPost = (accessToken, values) => {
  const query = `
    mutation ($input: CreatePostInput!) {
      createPost(input: $input) {
        post {
          id
          workoutDate
          performances {
            event {
              id
              name
            }
            value
            set1
            set2
            set3
            set4
            set5
          }
        }
      }
    }
  `
  const vars = {
    input: {
      ...values,
      clientMutationId: getClientMutationID('createPost'),
    },
  }
  return api(accessToken, query, vars).then(r => r.createPost.post)
}

export const updatePost = (accessToken, values) => {
  const query = `
    mutation ($input: UpdatePostInput!) {
      updatePost(input: $input) {
        post {
          id
          workoutDate
          performances {
            event {
              id
              name
            }
            value
            set1
            set2
            set3
            set4
            set5
          }
          remark
        }
      }
    }
  `
  const vars = {
    input: {
      ...values,
      clientMutationId: getClientMutationID('updatePost'),
    },
  }
  return api(accessToken, query, vars).then(r => r.updatePost.post)
}

export const deletePost = (accessToken, id) => {
  const query = `
    mutation ($input: DeletePostInput!) {
      deletePost(input: $input) {
        id
      }
    }
  `
  const vars = {
    input: {
      id,
      clientMutationId: getClientMutationID('deletePost'),
    },
  }
  return api(accessToken, query, vars)
}

// Users

export const signIn = ({ username, password }) =>
  axios.post(
    `${API_URL}/o/token/`,
    queryString.stringify({
      grant_type: 'password',
      username,
      password,
    }),
    {
      auth: {
        username: API_CLIENT_ID,
        password: API_CLIENT_SECRET,
      },
    },
  )

export const fetchLoggedInfo = accessToken => {
  const query = `
    {
      user {
        username
        email
      }
    }
  `
  return api(accessToken, query).then(r => r.user)
}
