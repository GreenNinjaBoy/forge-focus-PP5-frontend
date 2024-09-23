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
## HomePage
## NavBar
## User Authentication
## Signup Page
## Signin Page
## Goals
## Steps
## User Messages
## Search Goals
## Contact Form

# Future Features
## Edit/Delete User Profiles
## Improved Navigation
## Rank Goals

# Languages Used

# FrameWorks and Libraries Used

# Technologies and Tools Used

- React: A JavaScript library for building user interfaces
- Vite: Next generation frontend tooling
- Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine

# Validation and Testing

# Bugs/fixes

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
