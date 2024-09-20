import React from 'react';

const ForgetPassword = () => {
  return (
    <div>
      {/* Forget password form */}
      <h2>Forget Password Page</h2>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgetPassword;