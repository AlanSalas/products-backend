import { __DIRNAME } from "./constants.js";

export const emailConfigActivateAccount = (user, url) => {
  return {
    userId: user._id,
    from: '"Products App" <dubekone@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: `¡Activate your account ${user.name}!`, // Subject line
    html: `
            <div style="margin: 0 auto; display: table; text-align: center; height: 400px;">
            <div style="display: table-cell; text-align: center; vertical-align: middle;">
                <h1 style="margin: 0 0 15px 0; color: #73d13d; font-size: 20px;">Activate account</h1>
                <p style="margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">This link expires in 20 minutes.</p>
                <b><a style="display: inline-block; border-radius: 10px; text-decoration: none; padding: 15px; background-color: #73d13d; color: #fff;" href="${url}">Activate</a></b>
              </div>
            </div>
        `, // html body
  };
};

export const emailConfigUpdatePassword = (user, url) => {
  return {
    from: '"Products App" <dubekone@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Update password", // Subject line
    html: `
        <div style="margin: 0 auto; display: table; text-align: center; height: 400px;">
        <div style="display: table-cell; text-align: center; vertical-align: middle;">
            <h1 style="margin: 0 0 15px 0; color: #73d13d; font-size: 20px;">Update your password</h1>
            <p style="margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">
                We found out that you forgot your password, we will help you reset it, if you did not request to update your password, please ignore this email.
            </p>
            <b><a style="display: inline-block; border-radius: 10px; text-decoration: none; padding: 15px; background-color: #73d13d; color: #fff;" href="${url}">Update password</a></b>
          </div>
        </div>
    `, // html body
  };
};
