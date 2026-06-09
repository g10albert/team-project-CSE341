const router = require("express").Router();
const commentController = require("../controllers/commentController");
const { check } = require("express-validator");

const validateComment = [
  check(
    "taskId",
    "Valid task mongo ID target string pointer required.",
  ).isMongoId(),
  check("text", "Comment message text parameters cannot be empty.")
    .not()
    .isEmpty(),
];

router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getCommentById);
router.post("/", validateComment, commentController.createComment);
router.put(
  "/:id",
  [check("text", "Comment text cannot be empty.").not().isEmpty()],
  commentController.updateComment,
);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
