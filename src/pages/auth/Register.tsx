
import React from 'react';
import { RegisterForm } from './components/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-gray-600">
            Join Harare Zone Connect to access local services and listings
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
