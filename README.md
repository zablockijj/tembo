# tembo journal
For my own organizational purposes:

two ways to access app - web and text

text will have access to:
- create entry via text
- create journal via text
- retrieve entry via text?

web will have access to:
- create entry
- view entries
- create journal
- edit entries
- delete entries
- add reminder
- edit reminder
- delete reminder

Makes sense to divide app into two - sms and web

I like this structure, from http://stackoverflow.com/questions/18927298/node-js-project-naming-conventions-for-files-folders
if find better one might change
modified above a bit to get (anything in parens not decided or using yet):
/
  /lib - back-end express files
    /config - loads config to app.settings
    /models - loads mongoose models
    /routes - sets up app.get('..')...
      /web
        routes.js
      /sms
        routes.js
  /test - contains test files      

  (/etc) - contains configuration
  (/app) - front-end javascript files
    /config - loads config
    /models - loads models
  (/bin) - helper scripts    
  (/srv) - contains public files
  (/usr) - contains templates

Lots of different cron packages,  ones I liked:
- https://github.com/node-schedule/node-schedule (might need work around to start at time and then reoccur wthin day - choses because active support)
- https://github.com/ncb000gt/node-cron (issues said stopped working after little while)
- https://github.com/rschmukler/agenda (has own db saves, might switch if needed)
 (for future, to scale - https://www.iron.io/, https://bitbucket.org/delemach/iron-scheduler)
(or maybe RabbitMQ)

TODO:
- User model
- Events to log everything that happens to compare daily to ensure accurate record (for if paid model)
- Fix Entry
- Basic Web Routes


decided not to crete journal from entry as option bc too easy to make typos when texting
