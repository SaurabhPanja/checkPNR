"# railwayAPI"\n
Hello!\n
This application will email me when my IRCTC PNR status is confirmed, since it is
very hard to get an API that provides PNR status. I found another way to get PNR status.
In this application I am making an http request to railyatri website in order to get my
PNR status from their site, I am saving whole website in a variable as string. The website will reload every hour, if it finds 'CNF' string in it, the application will
message me.

Stack used : Nodejs
