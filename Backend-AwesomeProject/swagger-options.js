const SWAGGER_OPTIONS ={
    definition: {
      // openapi: "3.1.0",
      swagger: "2.0",
      info: {
        title: "BudgetMate Backend",
        version: "1.0.5",
        description:
          "BudgetMate Backend Server for  Yemen's MoF System. This uses a MongoDB backend and can communicate with an SMS Gateway to receive and send out messages. It has been built and tested with twilio, but it can be switched out for any other gateway.",
        contact: {
          name: "BudgetMate Team",
          url: "https://studio.rtl.ug",
          email: "dadashvespek@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
          url: "https://hackathon-backend-production-d077.up.railway.app"
        },
      ],
    },
    apis: ["./index.js"],
  };

  module.exports = SWAGGER_OPTIONS;