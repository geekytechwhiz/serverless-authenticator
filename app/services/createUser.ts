import { documentClient } from '../utils/config';
import { UsersTable } from '../utils/constants';

export const createUser = async (request: any) => {
  try {
    console.info(`Request: createUser - ${UsersTable}'-'${request.EmailId}`);
    let res = await documentClient
      .put({
        TableName: UsersTable,
        Item: request,
      })
      .promise();

    console.info('Response: createUser :', res);
    return request;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const GetBrand = () => {
  console.info('Get Brand Called');
};
