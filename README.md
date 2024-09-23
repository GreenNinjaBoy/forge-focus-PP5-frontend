# Forge Focus
## Created By Jamie Connell 
## Student of CodeInstitute 2024

### Insert Responsivie image when ready

Forge Focus is a task management application that allows users to creatre, manage and orgasnise goals that they wish to acieve.
These goals can be everyday goals, or more spesific to a certain apect of the users live.

## Contents

- [Design](#Design)
    - [The Strategy Plane](#The-Strategy-Plane)
    - [The Scope Plane](#The-Scope-Plane)
    - [The Skeleton Plane](#The-Design-Plane)
    - [The Surface Plane](#The-Surface-Plane)
    - [Agile Methodology](#Agile-Methodology)
- [Features](#Features)
    - [Homepage](#HomePage)
    - [NavBar](#NavBar)
    - [User Authentication](#User-Authentication)
    - [Signup](#Signup)
    - [Login](#Login)
    - [Logout](#Logout)
    - [Goals](#Goals)
    - [Steps](#Steps)
    - [User Messages](#User-Messages)
    - [Contact Form](#Contact-Form)
    - [Search Goals](#Search-Goals)
- [Future Features](#Future-Features)
    - [Edit/Delete User Profiles](#Edit/Delete-User-Profiles)
    - [Improved Navigation](#Improved-Navigation)
    - [Rank Goals](#Rank-Goals)
- [Languages Used](#Languages-Used)
- [FrameWorks and Libraries Used](#Frameworks-and-Libraries-Used)
- [Technologies and Tools Used](#Technologies-and-tools-used)
- [Validation and Testing](#Validation-and-Testing)
- [Bugs/fixes](#Bugs/fixes)
- [Creating/Deployment](#Creating/Deployment)
    - [Create Repository](#Create-Repository)
    - [Cloning Repository](#Cloning-Repository)
    - [Forking Repository](#Forking-Repositiry)
    - [Connecting to backend API](#Connecting-to-backend-API)
    - [CodeInstitute SQL](#CodeInstitute-SQL)
    - [Deploying Using Heroku](#Deploying-Using-Heroku)
    - [Creating Django backend API](#Creating-Django-Backend-API)
- [Credits](#Credits)
    - [Content](#Content)
    - [Code](#Code)
- [Acknowledgements](#Acknowledgements)

# Design
## The Strategy Plane
## The Scope Plane
## The Structure Plane
## The Skeleton Plane
## The Surface Plane
## Agile Methodology

# Features

## NavBar

The MainNavbar component is a crucial part of the Forge Focus application, 
providing intuitive navigation and user-specific actions. Key features include:

1. Responsive Design:
- Utilizes React Bootstrap for a mobile-friendly, collapsible menu
- Custom styling with CSS modules for a unique look and feel

2. Dynamic Content:
- Adapts navigation options based on user authentication status
- Displays different links for logged-in and logged-out users


3. Branding:
- Features the "Forge Focus" logo with an animated flame icon
- Logo acts as a home button, directing to dashboard or landing page based on user status

4. Authentication Integration:

- Implements sign-out functionality with proper token management
- Uses custom hooks (useCurrentUser and useSetCurrentUser) for user state management

5. Navigation Links:
- For logged-in users: Goals, Tasks, Contact Us, and Sign Out
- For logged-out users: Login, Signup, and Contact Us

6. Styling:
- Uses Lucide React icons for visual enhancements
- Implements custom CSS modules for scoped styling

This NavBar component ensures a seamless and intuitive navigation experience, 
adapting to the user's authentication status and providing easy access 
to key features of the Forge Focus application.

**Insert Image When Ready**

## AboutPage

The About page serves as the landing page for Forge Focus.
Key Features of the About Page Include:

1. **Interactive Carousel**: A visually engaging carousel that introduces user to the
core concepts of the Forge Focus application:
- Welcome message emphasizing the app's purpose
- Overview of the app's functionality
- Explanation of the goal creation process
- Explanation of the task creation and how
to link tasks to goals.

2. User-Friendly Navigation: Clear calls-to-action for both new and returning users:

- "Sign Up" button for new users to create an account
- "Sign In" button for existing members to access their dashboard

3. Responsive Design: Utilizes React Bootstrap components to ensure a seamless experience across different devices and screen sizes.
Custom Styling: Implements a module-based CSS approach for maintainable and scoped styles.

4. Custom Styling: Implements a module-based CSS approach for maintainable and scoped styles.

The About page effectivley Communicates the value proposition of Forge Focus, 
encouraging users to take action and refining and achieving their personal goals
through structured planning and task management.

**Add picture here when ready**

## HomePage
The Home component serves as the main dashboard for the Forge Focus application. 
It provides users with an overview of their goals and tasks, 
as well as quick access to key features. Key aspects of this component include:

1. Authentication-based Content:
- Displays personalized content for logged-in users
- Shows a sign-in prompt for non-authenticated users


2. User Data Fetching:
- Utilizes custom hooks (useCurrentUser and useSetCurrentUser) for user state management
- Fetches user data on component mount if not already available


3. Dynamic Dashboard:
- Retrieves and displays the count of user's goals
- Shows the number of tasks not assigned to any goals
- Updates in real-time as the user interacts with the application


4. Quick Action Cards:
- Goals Card: Displays goal count and provides buttons to create new goals or view existing ones
- Tasks Card: Shows count of unassigned tasks with options to create new tasks or view all tasks

5. Responsive Design:
- Uses React Bootstrap components for a mobile-friendly layout
- Implements custom CSS modules for styled components


6. Navigation Integration:
- Utilizes React Router for seamless navigation between different sections of the app

7. Loading State Handling:
- Displays a loading indicator while fetching user data

8. Error Handling:
- Implements try-catch blocks to manage potential API request failures

This Home component provides users with a clear overview of their progress and 
easy access to the main features of Forge Focus, 
encouraging engagement with goal-setting and task management functionalities.

**Add Picture When Ready**

## User Authentication/ Not Authorized Page

Forge Focus implements an authentication and authorization system 
to ensure secure access to user-specific content. 
The system comprises several key components:

**ProtectedRoute Component**
- Acts as a wrapper for routes that require authentication
- Checks the user's authentication status
- Redirects unauthenticated users to the sign-in page
- Displays a loading state while determining user authentication status

**CurrentUserProvider Component**
- Manages the global state for the current user
- Utilizes React Context API for efficient state management
- Handles user authentication on initial load
- Implements token refresh mechanism to maintain user sessions
- Uses axios interceptors to handle authentication errors and token refreshing
- Provides the current user data and setter function to child components

**NotAuthorized Component**
- Displays a user-friendly message when access is denied
- Offers options to sign in or sign up
- Utilizes React Router for navigation to authentication pages

### Key Features:

1. Global State Management:
- Uses React Context for efficient sharing of user data across components

2. Token Refresh Mechanism:
- Automatically refreshes authentication tokens to maintain user sessions

3. Interceptors for API Requests:
- Handles 401 (Unauthorized) errors by attempting to refresh the token
- Redirects to sign-in page if token refresh fails

4. Protected Routes:
- Ensures that certain routes are only accessible to authenticated users

5. Loading State Handling:
- Displays loading indicator while fetching user data or determining authentication status

6. Error Handling:
- Gracefully handles authentication errors and network issues

7. User-Friendly Unauthorized Access Handling:
- Provides clear instructions and easy navigation options when access is denied

This authentication system ensures that Forge Focus maintains a secure environment 
where users can safely interact with their personal goal and task data, 
while providing a smooth user experience throughout the authentication process.

**Add in picture When Ready**


## Signup Page


## Signin Page
The SignIn component provides a user interface for existing users to authenticate 
and access their Forge Focus account. This component is crucial 
for the application's security and user experience.

**Key features and functionalities:**

1. User Input Handling:
- Collects username and password from the user
- Uses controlled components for form inputs
- Real-time update of state as user types

2. Form Submission:
- Prevents default form submission behavior
- Sends a POST request to the backend API for authentication
- Handles successful login by updating the current user state and navigating to the home page

3. Error Handling:
- Displays validation errors returned from the server
- Shows password-related errors as alerts

4. State Management:
- Utilizes React's useState hook for local state management
- Integrates with custom hooks for global state management (useSetCurrentUser, useCurrentUser)

5. Authentication Flow:
- Sets authentication tokens upon successful login
- Updates the global user state with the logged-in user's information

6. Redirection:
- Uses a custom hook (useRedirect) to prevent already logged-in users from accessing the sign-in page

7. Success Feedback:
- Utilizes global success message hooks to provide feedback on successful sign-in

8. Security Considerations:
- Password field uses type="password" for secure input
- Integrates with backend API authentication system for secure credential verification

This SignIn component ensures a smooth and secure authentication process for Forge Focus users, 
integrating with the application's overall authentication and authorization system.

**Insert Image When Ready**

## Main Goals Area
## Goal Detail Page
## Create New Goal
## Edit Goal
## Delete Goal

## Main Tasks Area
## Task Details Page
## Create New Task
## Edit Task
## Delete Task

## User Messages
## Search Goals
## Contact Form

# Future Features

## Add User Profiles
## Edit/Delete User Profiles
## Improved User Navigation
## Rank Goals
## Connect with other Users
## Team Goals With Other Users
## Message System to communicate to other users


# Technologies/ Lanuages used

Forge Focus uses a variety of modern web development technologies to create the
React application. It uses the combination of Vite for fast builds, React for
UI components, and testing tools. All of which are listed below.

## Languages Used

- JavaScript: The primary language used for both frontend and build tools
- JSX: A syntax extension for JavaScript used with React
- HTML: Markup language for structuring web content
- CSS: Style sheet language for describing the presentation of web content

## FrameWorks and Libraries Used

- React Router: Declarative routing for React applications
- React Bootstrap: Bootstrap components built with React
- Axios: Promise-based HTTP client for the browser and Node.js
- JWT Decode: Library to decode JWTs token which are Base64Url encoded
- Lucide React: Beautiful & consistent icon toolkit made by the community
- Prop Types: Runtime type checking for React props

## Technologies and Tools Used

- React: A JavaScript library for building user interfaces
- Vite: Next generation frontend tooling
- Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine

## Validation and Testing

- React Testing Library: Simple and complete testing utilities for React
- Jest DOM: Custom Jest matchers to test the state of the DOM
- User Event: Library for simulating user events for testing

## Deployment

- Serve: Static file serving and directory listing
- Heroku: Cloud platform for deploying and running modern apps

## Bugs/fixes

The bugs below were identified during the development of The Forge Focus application.
For ease of reading I have attempted to split the bugs into their associated features.

### HomePage
<details>
<summary>Click Arrow to see bugs related to HomePage</summary>
| Bug Description | Errors displayed | Steps Taken to Fix | Is bug Fixed (Y/N) |
</details>

### NavBar
<details>
<summary>Click Arrow to see bugs related to NavBar</summary>
| Bug Description | Errors displayed | Steps Taken to Fix | Is bug Fixed (Y/N) |
| NavBar attempting to fetch user data without usersigned in | current error code displayed on developer console - GET 403 (Forbidden) | I was able to fix the issue as i noticed that i did not make sure that the "FetchUserData" function was only called when the "currentUser" was not null. By making this change the error/bug was resolved | bug now fixed |
|when user is signed in nav bar items do not change| nav items not change | to fill in| error to be fixed|
</details>

### User Authentication
<details>
<summary>Click Arrow to see bugs related to User Authentication</summary>
| Bug Description | Errors displayed | Steps Taken to Fix | Is bug Fixed (Y/N) |
</details>

### Signup Page
<details>
<summary>Click Arrow to see bugs related to SignUp Page</summary>
| Bug Description | Errors displayed | Steps Taken to Fix | Is bug Fixed (Y/N) |
|--|--|--|--|
| When attempting to signup as a user, a 500 internal error would display in the console but when API Checked within backend the user has been created. | 500 (Internal Server Error) handleSubmit@ Signup.jsx:30  | with the help with the following link from stack overflow, the issue has now been resolved and the error now does not display | Bug is now fixed|
</details>

### Signin Page
<summary>Click Arrow to see bugs related to SignIn Page</summary>
| Bug Description | Errors displayed | Steps Taken to Fix | Is bug Fixed (Y/N) |
| When attempting to sign in, the developer console displayed an error and the page did not redirect as intended, however when refreshed showed user as logged in | Access token is missing in the response | Still attempting to fix | bug not fixed |

### Goals
<summary>Click Arrow to see bugs related to Goals</summary>
| Bug Description | Errors displayed | Steps Taken to Fix | Is bug Fixed (Y/N) |
| When creating new goals console retunrs CORS Error | has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. | Will have to do a bit more research into CORS to try resolve the issue | Bug to be fixed |

### Steps
<summary>Click Arrow to see bugs related to Steps</summary>
| Bug Description | Errors displayed | Steps Taken to Fix | Is bug Fixed (Y/N) |

### User Messages
<summary>Click Arrow to see bugs related to User Messages</summary>
| Bug Description | Errors displayed | Steps Taken to Fix | Is bug Fixed (Y/N) |

### Search Goals
<summary>Click Arrow to see bugs related to Search Goals</summary>
| Bug Description | Errors displayed | Steps Taken to Fix | Is bug Fixed (Y/N) |

### Contact Form
<summary>Click Arrow to see bugs related to Contact Form</summary>
| Bug Description | Errors displayed | Steps Taken to Fix | Is bug Fixed (Y/N) |

# Creating/Deployment
## Create Repository
## Cloning Repository
## Forking Repository
## Connecting to backend API
## CodeInstitute SQL
## Deploying Using Heroku
## Creating Django backend API

# Credits
## Content
## Code

# Acknowledgements
