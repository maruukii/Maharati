import React, { lazy } from "react";
import { layoutTypes } from "../constants/layout";

// Lazy load the components
const Home = lazy(() => import("../pages/Home/Home"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const About = lazy(() => import("../pages/About/About"));
const Courses = lazy(() => import("../pages/Courses/Courses"));
const Login = lazy(() => import("../pages/login/login"));
const Signup = lazy(() => import("../pages/signup/signup"));
const EmailVerification = lazy(() =>
  import("../pages/PasswordReset/EmailVerification")
);
const AccountActivation = lazy(() => import("../pages/signup/activateAccount"));
const CourseDetails = lazy(() =>
  import("../pages/CourseDetails/CourseDetails")
);
const PasswordReset = lazy(() =>
  import("../pages/PasswordReset/PasswordReset")
);
const RedirectIfLoggedIn = lazy(() => import("../hooks/RedirectIfLoggedIn"));
const HandleExternalOauth = lazy(() =>
  import("../hooks/handleExternalOauth.jsx")
);

// Dashboard
const Dashboard = lazy(() => import("../pages/Dashboard/index.jsx"));
// Courses
const ManageCourses = lazy(() => import("../pages/manage-courses/CoursesDash"));
//Test
const TestFinal = lazy(() => import("../pages/manage-courses/TestFinal.jsx"));

// Calendar
const Calendar = lazy(() => import("../pages/Calendar/index.jsx"));

// Email
const Reclamations = lazy(() => import("../pages/Support/Reclamations.jsx"));

// Audit
const Audit = lazy(() => import("../pages/Audit/Audit.jsx"));
// Authentication pages
const UserProfile = lazy(() => import("../pages/Profile/user-profile.jsx"));
const Login1 = lazy(() => import("../pages/AuthenticationPages/Login.jsx"));
const Register1 = lazy(() =>
  import("../pages/AuthenticationPages/Register.jsx")
);
const RecoverPassword = lazy(() =>
  import("../pages/AuthenticationPages/RecoverPassword.jsx")
);
const LockScreen = lazy(() =>
  import("../pages/AuthenticationPages/LockScreen.jsx")
);

// Utility pages
const StarterPage = lazy(() => import("../pages/Utility/Starter-Page.jsx"));
const Maintenance = lazy(() => import("../pages/Utility/Maintenance-Page.jsx"));
const ComingSoon = lazy(() => import("../pages/Utility/ComingSoon-Page.jsx"));
const TimeLine = lazy(() => import("../pages/Utility/TimeLine-Page.jsx"));
const FAQs = lazy(() => import("../pages/Utility/FAQs-Page.jsx"));
const Pricing = lazy(() => import("../pages/Utility/Pricing-Page.jsx"));
const Error404 = lazy(() => import("../pages/Utility/Error404-Page.jsx"));
const Error500 = lazy(() => import("../pages/Utility/Error500-Page.jsx"));

// UIElement pages
// const UiAlerts = lazy(() => import("../pages/UiElements/UiAlerts.jsx"));
// const UiBadge = lazy(() => import("../pages/UiElements/UiBadge.jsx"));
// const UiBreadcrumb = lazy(() => import("../pages/UiElements/UiBreadcrumb.jsx"));
// const UiButtons = lazy(() => import("../pages/UiElements/UiButtons.jsx"));
// const UiCards = lazy(() => import("../pages/UiElements/UiCards.jsx"));
// const UiCarousel = lazy(() => import("../pages/UiElements/UiCarousel.jsx"));
// const UiDropdown = lazy(() => import("../pages/UiElements/UiDropdowns.jsx"));
// const UiGrid = lazy(() => import("../pages/UiElements/UiGrid.jsx"));
// const UiImages = lazy(() => import("../pages/UiElements/UiImages.jsx"));
// const UiLightbox = lazy(() => import("../pages/UiElements/UiLightbox.jsx"));
// const UiModals = lazy(() => import("../pages/UiElements/UiModals.jsx"));
// const UiOffcanvas = lazy(() => import("../pages/UiElements/UiOffcanvas.jsx"));
// const UiRangeSlider = lazy(() =>
//   import("../pages/UiElements/UiRangeSlider.jsx")
// );
// const UiSessionTimeout = lazy(() =>
//   import("../pages/UiElements/UiSessionTimeout.jsx")
// );
// const UiPagination = lazy(() => import("../pages/UiElements/UiPagination.jsx"));
// const UiProgressBars = lazy(() =>
//   import("../pages/UiElements/UiProgressBars.jsx")
// );
// const UiPlaceholders = lazy(() =>
//   import("../pages/UiElements/UiPlaceholders.jsx")
// );
// const UiTabs = lazy(() => import("../pages/UiElements/UiTabs&Accordions.jsx"));
// const UiTypography = lazy(() => import("../pages/UiElements/UiTypography.jsx"));
// const UiToasts = lazy(() => import("../pages/UiElements/UiToasts.jsx"));
// const UiVideo = lazy(() => import("../pages/UiElements/UiVideo.jsx"));
// const UiPopovers = lazy(() =>
//   import("../pages/UiElements/UiPopovers&Tooltips.jsx")
// );
// const UiRating = lazy(() => import("../pages/UiElements/UiRating.jsx"));

// Forms pages
const FormEditors = lazy(() => import("../pages/Forms/FormEditors.jsx"));
const FormUpload = lazy(() => import("../pages/Forms/FormUpload.jsx"));
const FormXeditable = lazy(() => import("../pages/Forms/FormXeditable.jsx"));
const FormMask = lazy(() => import("../pages/Forms/FormMask.jsx"));
const FormElements = lazy(() => import("../pages/Forms/FormElements.jsx"));
const FormAdvanced = lazy(() => import("../pages/Forms/FormAdvanced.jsx"));
const FormValidations = lazy(() =>
  import("../pages/Forms/FormValidations.jsx")
);
const FormWizard = lazy(() => import("../pages/Forms/FormWizard.jsx"));

// Tables pages
const BasicTable = lazy(() => import("../pages/Tables/BasicTable.jsx"));
const ListJs = lazy(() => import("../pages/Tables/ListTables/ListTables.jsx"));
const DataTable = lazy(() =>
  import("../pages/Tables/DataTables/DataTables.jsx")
);

// Charts pages
const ApexCharts = lazy(() => import("../pages/Charts/ApexCharts.jsx"));
const ChartJs = lazy(() => import("../pages/Charts/ChartjsCharts.jsx"));
const Sparklinechart = lazy(() =>
  import("../pages/Charts/SparklineCharts.jsx")
);
const FloatChart = lazy(() => import("../pages/Charts/FloatCharts.jsx"));
const JknobCharts = lazy(() => import("../pages/Charts/JqueryKnobCharts.jsx"));

// Icons pages
const IconMaterialdesign = lazy(() =>
  import("../pages/Icons/IconMaterialdesign.jsx")
);
const IconFontawesome = lazy(() =>
  import("../pages/Icons/IconFontAwesome.jsx")
);
const IconDripicons = lazy(() => import("../pages/Icons/IconDrip.jsx"));
const IconBoxicons = lazy(() => import("../pages/Icons/IconBoxicons.jsx"));

// Maps pages
const VectorMaps = lazy(() => import("../pages/Maps/VectorMap.jsx"));
const GoogleMap = lazy(() => import("../pages/Maps/GoogleMap.jsx"));
const UsersList = lazy(() => import("../pages/Users/UsersList.jsx"));
const CrudCourse = lazy(() =>
  import("../pages/manage-courses/manage-course.jsx")
);
const CrudLesson = lazy(() =>
  import("../pages/manage-courses/manage-lesson.jsx")
);

const CourseViewer = lazy(() =>
  import("../pages/Course Viewer/CourseViewer.jsx")
);

// Define all routes in a single array with a type property
const routes = [
  // Client Routes
  { path: "/", element: <Home />, layout: layoutTypes.CLIENT },
  {
    path: "/login",
    element: (
      <RedirectIfLoggedIn>
        <Login />
      </RedirectIfLoggedIn>
    ),
    layout: layoutTypes.CLIENT,
  },
  { path: "/google/oauth", element: <HandleExternalOauth />, type: "public" },
  { path: "/facebook/oauth", element: <HandleExternalOauth />, type: "public" },
  { path: "/linkedin/oauth", element: <HandleExternalOauth />, type: "public" },
  { path: "/github/oauth", element: <HandleExternalOauth />, type: "public" },
  {
    path: "/forgot-password",
    element: (
      <RedirectIfLoggedIn>
        <EmailVerification />
      </RedirectIfLoggedIn>
    ),
    layout: layoutTypes.CLIENT,
  },
  {
    path: "/signup",
    element: (
      <RedirectIfLoggedIn>
        <Signup />
      </RedirectIfLoggedIn>
    ),
    layout: layoutTypes.CLIENT,
  },
  {
    path: "/account-activation",
    element: (
      <RedirectIfLoggedIn>
        <AccountActivation />
      </RedirectIfLoggedIn>
    ),
    layout: layoutTypes.CLIENT,
  },
  {
    path: "/reset-password",
    element: (
      <RedirectIfLoggedIn>
        <PasswordReset />
      </RedirectIfLoggedIn>
    ),
    layout: layoutTypes.CLIENT,
  },
  {
    path: "/contact",
    element: <Contact />,
    layout: layoutTypes.CLIENT,
  },
  {
    path: "/about",
    element: <About />,
    layout: layoutTypes.CLIENT,
  },
  {
    path: "/courses",
    element: <Courses />,
    layout: layoutTypes.CLIENT,
  },
  {
    path: "/course/:id",
    element: <CourseViewer />,
    type: "client",
    layout: layoutTypes.CLIENT,
  },
  {
    path: "/courseDetails",
    element: <CourseDetails />,
    layout: layoutTypes.CLIENT,
  },

  // Auth Protected Routes
  {
    path: "/dashboard",
    element: <Dashboard />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/calendar",
    element: <Calendar />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/user-profile",
    element: <UserProfile />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/profile",
    element: <UserProfile />,
    type: "client",
    layout: layoutTypes.CLIENT,
  },
  {
    path: "/users",
    element: <UsersList />,
    type: "Admin",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/reclamations",
    element: <Reclamations />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/audits",
    element: <Audit />,
    type: "Admin",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/manage-courses",
    element: <ManageCourses />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/Test-Final/:id",
    element: <TestFinal />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/Test-Final/:_id/:id",
    element: <TestFinal />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/Test-Final",
    element: <TestFinal />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/manage-course/:id",
    element: <CrudCourse />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/manage-course",
    element: <CrudCourse />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/manage-lesson/:id",
    element: <CrudLesson />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },

  {
    path: "/pages-starter",
    element: <StarterPage />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/pages-timeline",
    element: <TimeLine />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/pages-faqs",
    element: <FAQs />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  {
    path: "/pages-pricing",
    element: <Pricing />,
    type: "authProtected",
    layout: localStorage.getItem("layoutType"),
  },
  // {
  //   path: "/ui-alerts",
  //   element: <UiAlerts />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-badge",
  //   element: <UiBadge />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-breadcrumb",
  //   element: <UiBreadcrumb />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-buttons",
  //   element: <UiButtons />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-cards",
  //   element: <UiCards />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-carousel",
  //   element: <UiCarousel />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-dropdowns",
  //   element: <UiDropdown />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-grid",
  //   element: <UiGrid />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-images",
  //   element: <UiImages />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-lightbox",
  //   element: <UiLightbox />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-modals",
  //   element: <UiModals />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-offcanvas",
  //   element: <UiOffcanvas />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-rangeslider",
  //   element: <UiRangeSlider />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-sessiontimeout",
  //   element: <UiSessionTimeout />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-pagination",
  //   element: <UiPagination />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-progressbars",
  //   element: <UiProgressBars />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-placeholders",
  //   element: <UiPlaceholders />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-tabs-accordions",
  //   element: <UiTabs />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-typography",
  //   element: <UiTypography />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-toasts",
  //   element: <UiToasts />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-video",
  //   element: <UiVideo />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-popovers",
  //   element: <UiPopovers />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  // {
  //   path: "/ui-rating",
  //   element: <UiRating />,
  //   type: "authProtected",
  //   layout: layoutTypes.VERTICAL,
  // },
  {
    path: "/form-elements",
    element: <FormElements />,
    type: "authProtected",
    layout: layoutTypes.VERTICAL,
  },
  {
    path: "/form-validation",
    element: <FormValidations />,
    type: "authProtected",
    layout: layoutTypes.VERTICAL,
  },
  { path: "/form-advanced", element: <FormAdvanced />, type: "authProtected" },
  { path: "/form-editor", element: <FormEditors />, type: "authProtected" },
  { path: "/form-uploads", element: <FormUpload />, type: "authProtected" },
  { path: "/form-editors", element: <FormXeditable />, type: "authProtected" },
  { path: "/form-wizard", element: <FormWizard />, type: "authProtected" },
  { path: "/form-mask", element: <FormMask />, type: "authProtected" },
  { path: "/tables-basic", element: <BasicTable />, type: "authProtected" },
  { path: "/tables-listjs", element: <ListJs />, type: "authProtected" },
  { path: "/table-datatables", element: <DataTable />, type: "authProtected" },
  { path: "/chart-apexcharts", element: <ApexCharts />, type: "authProtected" },
  { path: "/chart-chartjscharts", element: <ChartJs />, type: "authProtected" },
  {
    path: "/chart-floatcharts",
    element: <FloatChart />,
    type: "authProtected",
    layout: layoutTypes.VERTICAL,
  },
  {
    path: "/chart-jknobcharts",
    element: <JknobCharts />,
    type: "authProtected",
    layout: layoutTypes.VERTICAL,
  },
  {
    path: "/chart-sparklinecharts",
    element: <Sparklinechart />,
    type: "authProtected",
    layout: layoutTypes.VERTICAL,
  },
  { path: "/icon-boxicon", element: <IconBoxicons />, type: "authProtected" },
  {
    path: "/icons-materialdesign",
    element: <IconMaterialdesign />,
    type: "authProtected",
    layout: layoutTypes.VERTICAL,
  },
  {
    path: "/icons-fontawesome",
    element: <IconFontawesome />,
    type: "authProtected",
    layout: layoutTypes.VERTICAL,
  },
  {
    path: "/icon-dripicons",
    element: <IconDripicons />,
    type: "authProtected",
    layout: layoutTypes.VERTICAL,
  },
  { path: "/maps-vector", element: <VectorMaps />, type: "authProtected" },
  { path: "/maps-google", element: <GoogleMap />, type: "authProtected" },

  // Public Routes
  // { path: "/logout", element: <Logout />, type: "public" },
  // { path: "/register", element: <Register />, type: "public" },
  { path: "/auth-login", element: <Login1 />, type: "public" },
  { path: "/auth-register", element: <Register1 />, type: "public" },
  { path: "/auth-recoverpw", element: <RecoverPassword />, type: "public" },
  { path: "/auth-lock-screen", element: <LockScreen />, type: "public" },
  {
    path: "/*",
    element: <Error404 />,
    type: "public",
  },
  { path: "/pages-500", element: <Error500 />, type: "public" },
  { path: "/pages-maintenance", element: <Maintenance />, type: "public" },
  { path: "/pages-comingsoon", element: <ComingSoon />, type: "public" },
];

export default routes;
