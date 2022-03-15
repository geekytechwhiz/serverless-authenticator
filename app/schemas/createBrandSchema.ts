const schema = {
    properties: {
      body: {
        type: 'object',
        properties: {
          brandId: {
            type: 'string',
          },
          brandName: {
            type: 'string',
          },
          mobileNumber: {
            type: 'string',
          },
          emailId: {
            type: 'string',
          } 
        },
         required: ['brandId',"brandName",'mobileNumber','emailId'],
      },
    },
    required: ['body'],
  };
  
  export const CreateBrandSchema=schema