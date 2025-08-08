import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Form } from '@/components/ui/form'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Card } from '@/components/ui/card'
import { Link,useNavigate } from 'react-router-dom'
import { RouteIndex, RouteSignIn } from '@/helpers/RouteName'
import axios from 'axios'
import { showToast } from '@/helpers/showToast'
import GoogleLogin from '@/components/GoogleLogin'
import { IoMdArrowBack } from "react-icons/io";

function SignUp() {

  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(3,'name must be at least 3 character long.'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 character long'),
    confirmPassword:z.string().refine(data => data.password === data.confirmPassword, 'password and confirm password should be same ')
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })
  
  async function onSubmit(values) {
    try{
      // console.log("Sending data:", values);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, values);

      const data = response.data;
      
      if(data.success){
        showToast('success', data.message)
        navigate(RouteSignIn)
        return;
      }
      showToast('error', data.message)        
       
      
    }catch(error){
      showToast('error',error.message )
    }
  }

  return (
	  <div>
      <div className='flex justify-center items-center w-screen h-screen '>
      <Card className="w-[400px] p-5">
        <h1 className='text-2xl font-bold text-center mb-5'>Create Your Account</h1>
        <div className=''>
          <GoogleLogin />
          <div className='border flex justify-center items-center mt-5'>
            <span className='absolute bg-white text-sm px-2 '>Or</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='mb-3'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your enail address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mb-3'>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <div className='mb-3'>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password again" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='mt-5'>
              <Button type="submit" className="w-full">Sign Up</Button>
              <div className='mt-5 text-sm flex justify-center gap-x-2'>
                <p>Already have account?</p>
                <Link to={RouteSignIn} className='text-blue-500 hover:underline'>Sign In</Link>
              </div> 
            </div>
          </form>
        </Form>
        <div>
            <Link to={RouteIndex} className='flex items-center justify-center gap-1 text-blue-500 hover:text-blue-800'>  
              <IoMdArrowBack className='text-xl'/>
              <p>Back to home </p>
            </Link>
        </div>
      </Card>
       </div>
    </div>
  )
}

export default SignUp
