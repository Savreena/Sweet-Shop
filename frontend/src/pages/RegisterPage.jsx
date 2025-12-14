import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      toast.success('Registration successful!');
      navigate('/');
    } else {
      setErrors({ form: result.error });
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Join us to explore delicious sweets</p>
        </div>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <Button type="submit" variant="primary" className="w-full">
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
