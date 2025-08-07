import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from '@/assets/images/logo-white.png'
import { IoHomeOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import {RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentsShow, RouteIndex, RouteUser } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/usefetch";
import { useSelector } from "react-redux";



function AppSidebar() {
    const user = useSelector(state => state.user)
  
    const { data: categoryData } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/category/all-category`, {
      method: 'get',
      credentials: 'include'
    })


    return (

      <Sidebar className='hidden md:block'>
        <SidebarHeader className='bg-white'>
          <img src={logo} width={120}/>
        </SidebarHeader>
        <SidebarContent className='bg-white'>
          <SidebarGroup />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <IoHomeOutline />
                  <Link to={RouteIndex}>Home</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {user && user.isLoggedIn ? 
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <GrBlog />
                      <Link to={RouteBlog}>Blogs</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FaRegComments />
                      <Link to={RouteCommentsShow}>Comments</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
                :
                <></>
              }

              {user && user.isLoggedIn && user.user.role === 'admin' ?
                <>  
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <TbCategory />
                      <Link to={RouteCategoryDetails}>Categories</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <LuUsers />
                      <Link to={RouteUser}>Users</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
                :
                <></>
                
              } 
            </SidebarMenu>
          <SidebarGroup />
          
          {/* Categories */}
          <SidebarGroup />
            <SidebarGroupLabel >
              Categories
            </SidebarGroupLabel>
              {categoryData && categoryData.category.length > 0 &&
                categoryData.category.map(category => (
                  <SidebarMenu key={category._id}>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <GoDot />
                        <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
              ))
            }
            
          <SidebarGroup />
        </SidebarContent>
      </Sidebar>

    )
}

export default AppSidebar
