# Dress 'em Up

![Logo of the project](./frontend/public/images/app-icon.jpg =250x250)

Check out Dress 'em Up at the live link below:

https://dress-em-up.herokuapp.com/

> Welcome to Dress 'em Up

An app designed to connect personal shoppers/designers with gift-givers everywhere, Dress-em-up helps you to find the perfect gift for yourself, your significant other, or your loves ones.  Based on a gig economy design the app provides users the opportunity to upload images of their loved ones or themselves in their favorite clothes, send a request to a designer, and receive recommendations in the form of hyperlinks to the perfect clothes.  Each designer will in turn create a response with hyperlinks and receive cash compensation for fulfilling the request.  

Users are designated as a user or designer and information is stored online in AWS's S3 online service.

As a logged-in user, you will have access to:

* Homepage Feed (gives insight into recent recommendations by others that are signed into the app )
* Orders (connection to current requests along with past recommendations)
* Likes (created using dresses with 5 dresses for excellent and 1 dress for poor)
* Search (Search for popular designers or look at your own past designers)

## Features

### Splash Page

The Splash Page will feature a carousel that gives users the information into how the app works if they do not already have a login saved.  Includes a login and signup modal as shown below.  Designers can also request to become a future designer by uploading their resume and then can preview the site experience similar to a users.  If they already have an account they are taken to the main home page:

![Screen Shot of Splash Page](./frontend/public/images/dress-em-up-intro.gif)


### Home Page

The Home Page will render a list of recent recommendations made by designers and users who are apart of the community.  The recommendations are rendered by most recent and allow users to click on the links that were recommended to other users to see if a designer has done a good job with other users:

![Screen Shot of Home Page](./frontend/public/images/dress-em-up-homepage.gif)

The links are shown below and are rendered on each recommendation form.  Depending on what type of request the user made (dress, shirt, pants, etc.) the image rendered uses a randmoization algorhythm to render an image to match their specific type of request.

![Screen Shot of Home Page Helpers](./frontend/public/images/dress-em-up-links.gif)

### Searchbar

The searchbar was an interesting challenge as I tried to implement the best sorting algorhythm while also using a complex sequelize query that added users depending on location and/or a general search:

* Use possible multiple parameters to search location and general search(similar to yelp)

    To implement this, I used a react/redux store on the frontend which checked on the backend for a particular search.
    
    ```js
  if (!req.query['q0']) {
    const oldDesigners = await User.findAll({
      where: {
        userType: false,
      }
    })
    designers = {}
    for (let i = 0; i < oldDesigners.length; i++) {
      designers[oldDesigners[i].id] = oldDesigners[i]
    } 
  } 
  else if (!req.query['q1']) {
    console.log("FIRST CONSTRUCTION!!!!")
    let keywordSearch = req.query['q0']
    designers = await User.findAll({
      where: {
        userType: false,
        [Op.or]: [{firstName: {
          [Op.iLike]: '%'+keywordSearch+'%'
        }}, {lastName: {
          [Op.iLike]: '%'+keywordSearch+'%'
        }}, {email: {
          [Op.iLike]: '%'+keywordSearch+'%'
        }}, {username: {
          [Op.iLike]: '%'+keywordSearch+'%'
        }}]
      }
    })
  } 
  else {
    let keywordSearches = req.query;
    let queries = Object.values(keywordSearches).map((keywordSearch) => {
      return `%${keywordSearch}%`
    })
    designers = await User.findAll({
      where: {
        userType: false,
        [Op.or]: [
          {
            firstName: {
              [Op.iLike]: { [Op.any]: queries }
            }
          },
          {
            lastName: {
              [Op.iLike]: { [Op.any]: queries }
            }
          },
          {
            email: {
              [Op.iLike]: { [Op.any]: queries }
            }
          },
          {
            username: {
              [Op.iLike]: { [Op.any]: queries }
            }
          }
        ]
      }
    })
  }
    return res.json({ designers });
    )
    ```

* On the backend use the search options to query the database using a complex sequelize query.  This was complicated at times as the sequelize syntax is a bit convoluted at points.

    ```js
    const { keywordSearch, locationSearch } = req.body;

    let locals;

    if (locationSearch) {
      let { lat, lng } = await geocodeAddress(locationSearch)
      lat = parseFloat(lat, 10)
      lng = parseFloat(lng, 10)
      locals = await User.findAll({
        where: {
          lat: {
            [Op.between]: [(lat - .5), (lat + .5)]
          },
          lng: {
            [Op.between]: [(lng - .5), (lng + .5)]
          },
          [Op.or]: [{
            username: {
              [Op.iLike]: '%' + keywordSearch + '%'
            }
          }, {
            firstName: {
              [Op.iLike]: '%' + keywordSearch + '%'
            }
          }, {
            lastName: {
              [Op.iLike]: '%' + keywordSearch + '%'
            }
          }]
        },
      })
    } else {
      locals = await User.findAll({
        where: {
          [Op.or]: [{username: {
            [Op.iLike]: '%'+keywordSearch+'%'
          }}, {firstName: {
            [Op.iLike]: '%'+keywordSearch+'%'
          }}, {lastName: {
            [Op.iLike]: '%'+keywordSearch+'%'
          }}]
        }
      })
    }

    if (locals.length === 0) {
      let err = 'No results found'
      return res.json({
        err,
      });
    }

    return res.json({
      locals,
      apiKey: process.env.GOOGLE_API,
    });
    
    ```

### Tasks

The tasks list renders a list of complete and incomplete tasks for the user to see their own and others:

![Screen Shot of Tasks](./frontend/public/images/dress-em-up-orders.gif)

* Create a completed and incomplete task list
* If task needs to be completed for helper it has a checkmark and moves to completed list once checked
* If task needs to be completed for a helpee it includes a clickable image of the helping hands to add to your list.

The greatest challenge of this project was using many conditionals and nested conditionals to render the correct information depending on a helper or helpee

```js
let complete;
  let incomplete;
  if (isLoaded) {
    complete = Object.values(currentTasks).map((task, idx) => {
        if (task.completed) {
          return(
            <div className='task-container__list__completed' key={idx}>
              <i className="far fa-check-square completed-icon"></i>
              <p>{task.category} - {task.details}</p><br />
            </div>
          )
        }
      })
      incomplete = Object.values(currentTasks).map((task, idx) => {
        if (id === urlId && !currentHelpType && !task.completed) {
          return (
            <div className='task-container__list__incomplete' key={idx}>
              <div className="tasks__checkbox" key={idx}>{task.category} - {task.details}</div><br />
            </div>
          )
        } else if (!task.completed && currentHelpType) {
          return(
            <div className='task-container__list__incomplete' key={idx}>
              <input className='task-list__checkbox' type="checkbox" id={task.id} name='checkbox' onClick={alterTask} />
              <label className="tasks__checkbox" key={task.id} htmlFor={task.id}>{task.category} - {task.details}</label><br />
            </div>
          )
        } else if (!task.completed){
          return(
            <div className='task-container__list__incomplete' key={idx}>
              {!task.helperId ? 
              <i id={task.id} name='iWillHelp' onClick={alterTask} className="fas fa-hands-helping tasks__helping-hands-icon"></i> : null  }
              <div className="tasks__checkbox">{task.category} - {task.details}</div><br />
            </div>
          )
        }
      })
  }
```

The tasks list also utilized a react/redux store along with several queries on the backend for this information including patch requests to udpate information in the database when a task is completed or when a task is set to a helper.

![Screen Shot of Tasks](./frontend/public/images/dress-em-up-search.gif)
```js

router.patch('/', requireAuth, asyncHandler(async (req, res) => {
    let { taskId, name, userId } = req.body
    const id = parseInt(taskId)
    const user = parseInt(userId)
    let task;
    if (!name) {
      task = await Task.update({ helperId: user }, {
        where: {
          id: id
        }
      });
    } else {
      task = await Task.update({ completed: true }, {
        where: {
          id: id
        }
      });
    }
      return res.json({
        task
      });
  }));

```


## FAQ

### What is a helper and helpee?

A helper is someone who is willing to run errands, do household chores, help mow the lawn, etc. for someone.  A helpee is someone who needs help or assistance in one of these areas

### Why help?

The purpose of this app is to create a sense of community between all the users.  As our society becomes more engrossed with technology it is important we don't forget those who are left behind who still need our help.

## Links

Get some help or help out today... follow this link to join help:

https://helpp.herokuapp.com/

## Contributor

* Dale Sakamoto - DaleTsakamoto @ GitHub

