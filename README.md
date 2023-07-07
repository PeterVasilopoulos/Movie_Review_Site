# The Film Repository

<div align="center">

  <img src="https://i.imgur.com/uMHRZur.png" width="63%">
  More screenshots below
  
</div>

## About the Project
The Film Repository is a movie review website where users are able to search for movies, write reviews, and view other user’s reviews. The movie information is being pulled from The Movie Database API, so all the information is accurate and up-to-date.

### Front End
The front end was created using React because I wanted the functionality of states and hooks when using api calls with the ability for the page to re-render after the user changes their search without the page refreshing.

### Back End
I used Express for the backend because of the ease-of-use when creating an api and calling it with React.

### Database
The database on this project is MongoDB because it’s simple and flexible when I make changes in the back-end and I knew I wouldn’t need many table relationships.

## Challenges
### API
One big problem I ran into was the api. When I first started this project, I was using a different api which was very limiting. For the free version, I had only had a certain number of api calls per day and in those calls, I couldn't get all the information I wanted anyway. After a week or so, I found The Movie Database API which is completely free and gives access to a lot more information on the movies. There were still some problems, however. One api call limited me to 20 results per page, so I had to find a way to get more results than that. I ended up using an array of promises for multiple pages during the axios get request and then pushing all those my foundMovies variable (shown below).

<div align="center">

  <img src="https://i.imgur.com/PGyCUlh.png" width="70%">

</div>

### Iron-Session
Another challenge I came across was making the validation work for login and registration. This was my first time using Iron-Session with React and the login and registration itself wasn’t too bad, but it created a different problem with saving reviews. The User model has an attributes that is an array of review ids and therefore we need to save the user everytime they create a review. When trying to save the user review, it was checking for registration validation even though I wasn’t registering and that caused by backend to crash. It took a lot of trouble shooting, google searching, and asking for help to find the solution. As I said, it was my first time using Iron-Session so I didn’t understand it extremely well and in hindsight this fix seems a bit obvious. All I had to do was to add an if statement checking if my virtual variable, confirm password, existed when saving. Since the review form doesn’t have that, it was able to slip by without causing problems (shown below).

<div align="center">

  <img src="https://i.imgur.com/PGyCUlh.png" width="70%">

</div>

## Video Demos

<div align="center">

  ### Full Project Demo

  [<img src="https://i.ytimg.com/vi/KF8qw3DwxKY/maxresdefault.jpg" width="60%">](https://www.youtube.com/watch?v=KF8qw3DwxKY "Full Project Demo")

  ### API Calls

  [<img src="https://i.ytimg.com/vi/pyDZ3DFH6-I/maxresdefault.jpg" width="60%">](https://www.youtube.com/watch?v=pyDZ3DFH6-I "API Calls Demo")
  
</div>

## Screenshots

<div align="center">

  ### Homepage
  <img src="https://i.imgur.com/26mmHu3.png" width="60%">

  ### Movie Search Landing Page
  <img src="https://i.imgur.com/zyDihxz.png" width="60%">

  ### Specific Movie Search
  <img src="https://i.imgur.com/USXfIQ4.png" width="60%">

  ### Movie Details
  <img src="https://i.imgur.com/uMHRZur.png" width="60%">
  <img src="https://i.imgur.com/2N0g5pC.png" width="60%">

  ### Cast and Crew
  <img src="https://i.imgur.com/QgnwHMj.png" width="60%">

  ### Review Form
  <img src="https://i.imgur.com/uWwSzi9.png" width="60%">

  ### All Users
  <img src="https://i.imgur.com/FTbcxSl.png" width="60%">

  ### One User
  <img src="https://i.imgur.com/zrVUYRT.png" width="60%">

  ### Login and Registration with Validation
  <img src="https://i.imgur.com/dr5GSSd.png" width="60%">
  <img src="https://i.imgur.com/hEQqqcx.png" width="60%">

</div>













