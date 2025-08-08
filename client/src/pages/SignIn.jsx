import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Form } from '@/components/ui/form'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'
import { showToast } from '@/helpers/showToast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import GoogleLogin from '@/components/GoogleLogin'

const SignIn = () => {
  const dispatch = useDispatch();


  const navigate = useNavigate();
  
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 character long')
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

   async function onSubmit(values) {
    try{
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, values);

      const data = response.data;
      
      if(!data.success){
       return showToast('error', data.message)
      }
      dispatch(setUser(data.user));
      navigate(RouteIndex)
      showToast('success', data.message)
  
    }catch(error){
      showToast('error',error.message )
    }
  }

  return (
    <div className='flex justify-center items-center w-screen h-screen '>

      <Card className="w-[400px] p-5">
        <h1 className='text-2xl font-bold text-center mb-5'>Login into account</h1>
        
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
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-5'>
              <Button type="submit" className="w-full">Sign In</Button>
              <div className='mt-5 text-sm flex justify-center gap-x-2'>
                <p>Don&apos;t have account?</p>
                <Link to={RouteSignUp} className='text-blue-500 hover:underline'>Sign Up</Link>
              </div> 
            </div>

          </form>
        </Form>
      </Card>


    </div>
  )
}

export default SignIn
