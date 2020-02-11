/* eslint-disable no-restricted-syntax */
const Knex = require('knex');
const dbOptions = require('../config/config').DB;

async function workDB(method, object) {
  let returnMessage = {};
  const updateUser = {};
  const postUser = {};
  // @ts-ignore
  const knex = new Knex(dbOptions);
  const { id, login, password, token } = object;
  console.log(method);
  switch (method) {
    case 'GET':
      if (Number(id)) {
        returnMessage = (async () => {
          return knex('users')
            .where('id', Number(id))
            .then((result) => {
              const res = result;
              console.log(res[0]);
              if (res[0] === undefined) {
                return { message: 'no user id' };
              }
              return { message: res[0] };
            })
            .catch((e) => {
              console.error(e);
              return { message: 'error read User' };
            });
        })();
      } else {
        return knex('users')
          .select('*')
          .then((result) => {
            const res = result;
            if (res[0] === undefined) {
              return { message: 'no user DB' };
            }
            return { message: res };
          })
          .catch((e) => {
            console.error(e);
            return { message: 'error read User' };
          });
      }
      break;

    case 'POST':
      if (!login || !password || !token) {
        returnMessage = { message: 'no data' };
        break;
      }

      // eslint-disable-next-line guard-for-in
      for (const i in object) {
        postUser[i] = object[i];
      }
      returnMessage = (async () => {
        return knex('users')
          .insert(postUser)
          .then((result) => {
            console.log(result);
            return { message: 'Create User OK' };
          })
          .catch((e) => {
            console.error(e);
            return 'error Create User';
          });
      })();

      break;

    case 'PUT':
      if (!login || !password || !token) {
        returnMessage = { message: 'no login' };
        break;
      }
      // eslint-disable-next-line guard-for-in
      for (const i in object) {
        updateUser[i] = object[i];
      }

      returnMessage = (async () => {
        return knex('users')
          .update(updateUser)
          .then(() => {
            return { message: 'update User ok' };
          })
          .catch((e) => {
            console.error(e);
            return { message: 'update User error' };
          });
      })();
      break;

    case 'DELETE':
      if (!Number(id)) {
        returnMessage = { message: 'no data' };
        break;
      }
      returnMessage = (async () => {
        return knex('users')
          .del('id', Number(id))
          .then(() => {
            return { message: 'delete User ok' };
          })
          .catch((e) => {
            console.error(e);
            return { message: 'delete User error' };
          });
      })();

      break;
    default:
      break;
  }

  const returnResult = await returnMessage;
  return returnResult;
}

module.exports = workDB;
