Campus Lost & Found Board: A Web Application for Reporting Lost and Found Items

Overview:
	Campus lost and found cases are common, but there is no straightforward way of reporting or looking for these except physically visiting a lost and found box or randomly searching social media pages. This project is called "Campus Lost & Found Board," and it is a light weight web-based application for posting lost and found items and searching through existing postings. The project scope is limited to developing it by a single developer in one to two weeks.

Core Features:
After creation: Any visitor may make an entry with the "Lost" or "Found" tag that has a title, brief description, category, location, and date. An account is not necessary.
Browsing and searching: All entries are viewable by anyone, and they can be searched based on category, keywords, or their lost and found nature.
Editing by owner only: After each entry is created, an unguessable edit link is automatically generated for it. The person who knows this link is the only one who can declare the post "Resolved" or delete it.

Technology Stack:
	The project will make use of HTML, CSS, and JS for the frontend and will not employ any framework or build tool to ensure rapid development on the part of one developer. On the backend, the project will make use of Node.js and Express to create a REST API with endpoints to create, read, update, and delete posts. The database will make use of SQLite, which does not require any additional server or configuration. Rather than using a login system, the posts will each have a unique token (for example, a UUID) assigned at their creation, which will be provided in an edit link that only the author will be able to see. The app may be run and demonstrated locally; however, should there be any need to host it, it may be done so through a free-tier hosting platform such as Render.

Why This Stack:
	All of these decisions come down to one limiting factor: one person, a few weeks, as well as other classes. The second-largest time-savings comes in removing user accounts, as authentication is significantly more time-consuming relative to its learning value than any of the other aspects in a small project like this. SQLite and JavaScript without frameworks reduce all the setup time, meaning that nearly all the available time is spent on building the actual program. The token edit link saves an element of access control as a valid software engineering idea without the expense of auth.

Conclusion:
	Though small in scope, the Campus Lost & Found Board shows key elements of software engineering knowledge like data modeling, RESTful API design, CRUD implementation, searching and filtering, and access controls. Due to its simple features, it is feasible for an individual programmer to develop and showcase it within a matter of weeks.