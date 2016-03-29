# theDivisionStatTracking

####Barebone's nodeJS server to access The Divsion player stats and profile information.

1. Go to: https://club.ubi.com/#!/en-GB/
2. Login
3. Look at xhr requests (chrome development console/fiddler/etc): http://i.imgur.com/1bEmQaF.png
    - Get the 'Ubi-AppId' from the headers (e.g: 314d4fef-e568-454a-ae06-43e3bece12a6)
    - Get your 'Authorization' token from the headers (e.g: Ubi_v1 t=ey...)
4. Replace gained information in server.js file.

Source: https://www.reddit.com/r/thedivision/comments/4bxf55/the_division_api/ <br>
Credit: /u/M3talstorm
