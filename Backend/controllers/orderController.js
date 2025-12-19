import razorpay from "razorpay";
import Course from "../models/CourseModel.js";
import User from "../models/userModal.js";
import dotenv from "dotenv";
dotenv.config();

const RazorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const razorpayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course Is Not Found" });
    }
    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: courseId.toString()
,
    };
    const order =await RazorPayInstance.orders.create(options);
    return res.status(200).json(order)
  } catch (error) {
    return res.status(500).json(`Failed to create Razorpay Order ${error}`)
  }
};


export const verifyPayment = async (req, res) => {
    try {
        const {courseId, userId, razorpay_order_id} = req.body
        const orderInfo =await RazorPayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            const user = await User.findById(userId)
            if(!user.enrolledCourse.includes(courseId)){
                await user.enrolledCourse.push(courseId)
                await user.save()
            }

            const course = await Course.findById(courseId).populate("lectures")
            if(!course.enrolledStudents.includes(userId)){
                await course.enrolledStudents.push(userId)
                await course.save()
            }

            return res.status(200).json({message:"payment verified and enrollment successfully."})
        }else{
            return res.status(400).json({message:"payment Failed"})
        }

    } catch (error) {
        return res.status(500).json(`Internal server error during payment verification ${error}`)
    }
}