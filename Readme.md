# Organizing code
 I organized the code into 4 folders. css folder, pages folder, images folder, and javascript folder.
 When the code is organized its easier to make changes to the different areas without being confused.
 I made the changes in the code so that it will link to the different folders in the project. If something is off make sure the folder name is correct.

 I moved your homepage out and renamed it to `index.html` this is how its typically done. This signifies the standing point of your project thaat links to other html pages that is why its outside the `pages` folder


# Index Page (formaly homepage)
you should link them to the `login page` not the new user page when they click `start shopping` because from there they can get to the new user registration page.

# Dresses Page
The dresses page is good but the item sizes are very big maybe you can work to reduce that alittle so you can see more items on the screen. The `next page` and `previous page` buttons are good and work well. I like the modal pop up and animation that works very well.

# Shoes Page

Same as the dresses page the items are too large you want to reduce this so you can see more items on that page that will make it look nice. I like the modal and the paging here as well.

# Login Page

Login Page is good. Try to align the checkbox for `show password` and the text to be side by side.
maybe something like this:
```
    <div class="some class here">
        <input type="checkbox" id="show-password-checkbox" onclick="togglePassword()">
        <label for="show-password-checkbox" class="show-password" style="margin: 0;">Show Password</label>
    </div>
```
this should group it together then you can style the div in css class.

# New User Page

This is good too. nice use of the <form> element in html. Same as above the `show password` is misaligned maybe use the same tactics above to realign it.

# Reset Password Page

Once they change their password you should link them to a new page that tells them their password has been changed and then give them a button to relog into the website.


# Login Script

I added code to `/javascript/script.js` this will handle the login and registration of the user. The first thing it does is initializes a database in memory and then exports the database to your localstorage so you can use it again. Once the database is initialized there are two functions `registerUser` and `loginUser` these functions are called when you submit the new user registration and when you login. `registerUser` will save your information to the database and update the database in localstorage. `loginUser` will query the database for your username and password and if successful will redirect into the application. if your user doesnt exist it will throw an error. `registerUser` will throw an error if the email already exists in the database.
