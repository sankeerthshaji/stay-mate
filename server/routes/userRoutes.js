const express = require("express");
const {
  getRoomTypes,
  admission,
  verifySignupOtp,
  loginUser,
  forgotPassword,
  resetPassword,
  getRoomDetails,
  createBookingOrder,
  verifyBookingPayment,
  fetchUserDetails,
  updateProfile,
  changePassword,
  fetchHostelMenu,
  getRoomTypeDetails,
  postHostelReview,
  getHostelReview,
  updateHostelReview,
  deleteHostelReview,
  getLeaveLetters,
  postLeaveLetter,
  getComplaints,
  postComplaint,
  getRentDue,
  getRentPaid,
  createRentOrder,
  verifyRentPayment,
  getAvailableRoomTypes,
  assignNewRoomType,
  postVacatingLetter,
} = require("../controllers/userController");
const admissionValidationMiddleware = require("../middlewares/validations/admission");
const updateProfileValidationMiddleware = require("../middlewares/validations/updateProfile");
const multer = require("multer");
const { storage } = require("../cloudinary");
const {
  requireAuthGuest,
  requireAuthResident,
} = require("../middlewares/authorization");
const reviewValidationMiddleware = require("../middlewares/validations/review");
const LeaveLetterValidationMiddleware = require("../middlewares/validations/leaveLetter");
const ComplaintValidationMiddleware = require("../middlewares/validations/complaintSchema");
const VacatingLetterValidationMiddleware = require("../middlewares/validations/vacatingLetterSchema");
const upload = multer({ storage });

const router = express.Router();

router.get("/roomTypes", getRoomTypes);

router.post(
  "/admission",
  upload.single("image"),
  admissionValidationMiddleware,
  admission
);

router.post("/verifyOtp", verifySignupOtp);

router.post("/login", loginUser);

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword", resetPassword);

router.get("/roomDetails/:id", getRoomDetails);

router.post("/createBookingOrder", requireAuthGuest, createBookingOrder);

router.post("/verifyBookingPayment", requireAuthGuest, verifyBookingPayment);

router.get("/userProfile/:id", requireAuthResident, fetchUserDetails);

router.patch(
  "/updateProfile/:id",
  requireAuthResident,
  upload.single("image"),
  updateProfileValidationMiddleware,
  updateProfile
);

router.post("/changePassword/:id", requireAuthResident, changePassword);

router.get("/fetchHostelMenu", requireAuthResident, fetchHostelMenu);

router.get("/roomTypeDetails", requireAuthResident, getRoomTypeDetails);

router.post(
  "/hostelReview",
  requireAuthResident,
  reviewValidationMiddleware,
  postHostelReview
);

router
  .route("/hostelReview/:id")
  .get(requireAuthResident, getHostelReview)
  .put(requireAuthResident, reviewValidationMiddleware, updateHostelReview)
  .delete(requireAuthResident, deleteHostelReview);

router
  .route("/leaveLetters")
  .get(requireAuthResident, getLeaveLetters)
  .post(requireAuthResident, LeaveLetterValidationMiddleware, postLeaveLetter);

router
  .route("/complaints")
  .get(requireAuthResident, getComplaints)
  .post(requireAuthResident, ComplaintValidationMiddleware, postComplaint);

router.get("/rentDue", requireAuthResident, getRentDue);

router.post("/createRentOrder", requireAuthGuest, createRentOrder);

router.post("/verifyRentPayment", requireAuthGuest, verifyRentPayment);

router.get("/rentPaid", requireAuthResident, getRentPaid);

router.get("/availableRoomTypes", requireAuthResident, getAvailableRoomTypes);

router.post("/assignNewRoomType", requireAuthResident, assignNewRoomType);

router.post(
  "/vacatingLetter",
  requireAuthResident,
  VacatingLetterValidationMiddleware,
  postVacatingLetter
);

module.exports = router;
