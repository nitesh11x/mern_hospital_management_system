import { config } from "dotenv";
config();

export const generateTokenPatient = (patient, message, statusCode, res) => {
  const token = patient.generateJsonWebToken();
  const cookieName = "patientToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
       secure: true,        // must be true on HTTPS
    sameSite: "None",    // required for cross-site
    path: "/", 
    })
    .json({ message, success: true, token, patient });
};

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "doctorToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
       secure: true,        // must be true on HTTPS
    sameSite: "None",    // required for cross-site
    path: "/", 
    })
    .json({ message, success: true, token, user });
};
