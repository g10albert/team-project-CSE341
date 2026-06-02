const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "TaskSphere REST API Documentation",
    description:
      "Interactive API sandbox client tracking projects and tasks parameters.",
  },
  host: "team-project-cse341.onrender.com",
  basePath: "",
  schemes: ["https"],
  definitions: {
    ProjectInput: {
      projectName: "",
      description: "",
    },
    TaskInput: {
      projectId: "", // Example MongoDB ObjectId placeholder
      taskName: "",
      description: "",
      dueDate: "",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger layout contract successfully built with input forms!");
});
