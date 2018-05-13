function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

async function processSingle(promise) {
  const result = await promise
  return result.exists ? result.data() : null
}

async function processMultiple(promise) {
  return (await promise).docs
}

export async function get(name) {
  return {
    [name]: async (_, { id }, { db }) =>
      processSingle(
        db
          .collection(name)
          .doc(id)
          .get()
      ),
  }
}

export function getAll(name) {
  return {
    [name + 's']: (_, args, { db }) => processMultiple(db.collection(name).get()),
  }
}

export function create(name) {
  return {
    ['create' + capitalize(name)]: (_, { id, ...other }, { db }) =>
      db
        .collection(name)
        .doc(id)
        .set(other),
  }
}

export function update(name) {
  return {
    ['update' + capitalize(name)]: (_, { id, ...other }, { db }) =>
      db
        .collection(name)
        .doc(id)
        .update(other),
  }
}

export function del(name) {
  return {
    ['delete' + capitalize(name)]: (_, { id }, { db }) =>
      db
        .collection(name)
        .doc(id)
        .delete(),
  }
}

export default function(db, name) {
  return {
    Query: {
      ...get(db, name),
      ...getAll(db, name),
    },
    Mutation: {
      ...create(db, name),
      ...update(db, name),
      ...del(db, name),
    },
  }
}
