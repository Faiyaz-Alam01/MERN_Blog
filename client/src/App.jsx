import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteCommentsShow, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUser } from './helpers/RouteName'
import Index from './pages/Index'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AddCategory from './pages/category/AddCategory'
import CategoryDetails from './pages/category/CategoryDetails'
import EditCategory from './pages/category/EditCategory'
import BlogDetails from './pages/blogs/BlogDetails.jsx'
import AddBlog from './pages/blogs/AddBlog.jsx'
import EditBlog from './pages/blogs/EditBlog.jsx'
import SingleBlogDetails from './pages/SingleBlogDetails.jsx'
import BlogByCategory from './pages/blogs/BlogByCategory.jsx'
import SearchResult from './pages/SearchResult.jsx'
import Comments from './pages/Comments.jsx'
import Users from './pages/UserPage.jsx'
import AuthRouteProtection from './components/AuthRouteProtection.jsx'
import AuthRouteProtectionAdmin from './components/AuthRouteProtectionAdmin.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />} >
          <Route index element={<Index />} />

          {/*anybody can be accessed  */}
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />    

          {/* Only loggedin user */}
          <Route element={<AuthRouteProtection />}>
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteCommentsShow} element={<Comments />} />
            <Route path={RouteProfile} element={<Profile />} />
          </Route>

          {/* Only admin can access */}
          <Route element={<AuthRouteProtectionAdmin />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteUser} element={<Users />} />
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
          </Route>

        </Route>

        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
