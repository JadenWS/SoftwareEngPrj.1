Campus Lost & Found

1. Customer Statement of Requirements: There is no effective means to post a lost and found in college currently; there is only a lost and found box, somewhere, along with an announcement in a college’s Facebook community. What I want to do is create a simple website where one can post any lost and found things that one has and then browse through those postings to check if their item is there.


2. Functional Requirements: Posts can be made about any items that have been lost or found.
A post must contain a title, description, category, and date. Location is optional. All posts can be viewed from within the website. A search can be done using key words for posts. Posts can be filtered according to the categories and whether lost or found. When a post is created, the user will receive a private link to modify or delete the post at a later date (without logging into the website). A user can mark his/her own post as “resolved”. A post should require at least a title and category.

Nonfunctional Requirements: It should be user-friendly enough that the person wouldn't need any sort of tutorial on how to use it. It should load fast (being such a small application, it shouldn't be too much trouble). Posts shouldn't vanish when the server reboots (it needs to really be stored in a database and not just in memory). The edit link must be random enough that no one can guess another person's edit link. It must be simple enough to install locally for development/testing purposes.

3. Inputting Data: All of the data is entered through the manual filling of a form, title, description, category, location, date, and whether it is lost or found. There is nothing getting imported into the system from any files or websites, at least not for this iteration.


Database/Storage: For this project, I am utilizing the SQLite database system. It is just one file that does not require a server to be configured, which is good because I am building this project alone. It is really just a table of posts, so it makes sense to use an SQL database rather than MongoDB.