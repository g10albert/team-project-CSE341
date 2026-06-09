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
      projectName: "New Alpha Project",
      description: "Building the main application backend architecture.",
    },
    TaskInput: {
      projectId: "60c72b2f9b1d8b2bad765432",
      taskName: "Database Schema Set Up",
      description:
        "Initialize Mongoose modeling profiles and wire up cluster rules.",
      dueDate: "2026-06-15",
    },
    CommentInput: {
      taskId: "60c72b2f9b1d8b2bad765432",
      text: "This dashboard layout requirement handles asset loads beautifully.",
    },
    TagInput: {
      tagName: "Urgent Priority",
      colorHex: "#e74c3c",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger layout contract successfully built with input forms!");
});
