# Monagree CLI
This is the Monagree Command Line Interface tool for developers to build e-commerce and logistics websites. Monagree provides an SDK (not the same as this package) for you to manage a business product and build frontend experiences. 
## Installation
Installing the CLI is relatively simple. Just run `npm i -g monagree-tools`, that's all!
## Usage
Monagree helps manage your project from start to finish. We even make coding easier by taking care of prerequisites.
### Overview
To see an overview of the commands available, open your terminal and run:

`monagree`
### Login
The first step is to login to the CLI. Before doing that, make sure you have an account at https://developers.monagree.com . You can create a personal account as well as a team account. We also recommend creating a github account for yourself or the team if you dont have one. Now run:

`monagree login`
This will launch a url where you will login and select the profile (you or a team) that will be creating the new design
> To logout (maybe to change an account) run `monagree logout`  

> Monagree CLI will never ask for your password!  

### Create new project
To create a new design (that's what we call projects), run this command from the folder containing all your projects (**Dont create a folder, well do it for you**):

`monagree init`
> **Note:** Dont create a folder, well do it for you when you run the command 

> **Note:** We recommend running this command from the folder where you'll be creating all your future designs  

The command will activate a wizard that asks you questions to configure your design.
> For now, you cannot chnage these configs once set so be meticulous  

> Make sure your design name and description and unique and very descriptive. Oh, and attractive to businesses.  

> **Note:** A folder `.monagree` will be created inside your design. Dont edit anything inside, you dont even need to open it  

> **Note:** After `monagree init` every other CLI command should be called from your design folder. If you didnt launch VS code, `cd` into your design folder  

To see info about your design (ie your config file) run this command **inside your design folder**:

`monagree init -p`
> The CLI supports coding in `js` and `ts` (more coming soon including `jsx`)  
###  Creating Branches
Branches are paths in your design. For instance if the website is at mekalon.com your `cart` branch will be at mekalon.com/cart. For now, branches can only go one level deep. To create a branch run:

`monagree branch BRANCH_ID`
> Replace `BRANCH_ID` with a one-word, very descriptive id. Eg. cart, orders, favs, landing  

> This command will create a folder with your `BRANCH_ID` inside the `src` folder. It'll include some files to get you started  

> **NOTE:** Do not create a branch folder yourself. The CLI wont recognize it.  

### Inside a branch
A new branch will contain a `js` or `ts` file (depending on your choice), a `css` file, an `html` file and a `readme.md` file. The most important file to use is the `index.js` or `index.ts` file. It is the `entry point` of that branch. Traditionally, people create an html file and inject a js/css file into it but we start with the `js` file instead. We see `html` and `css` files as components that you import into your `js` file (or `ts`, you get the idea). The initial `js` file has already set you up (Your main html file must be injected into an element with id `mon-app`, this element isn't managed by you. Just assume it exists). The file should look like this:
```javascript
// Import CSS files like this
import './index.css';
// Import html files like this (named)
import landing from './index.html';
//You may also import JS files

//The main webpage is set like this (edit as you want, but id must be `monapp`)
const appElement = document.getElementById('monapp');
appElement.innerHTML = landing;
```

> *Remember, dont create a branch yourself and dont delete the index.js file*  

### Framework & pre-processor support
Yes please. We support the use of css preprocessors like `SASS` `SCSS` `PostCSS` and css frameworks like `tailwind`. However, though we support them, it is not yet tested. We should fix that soon. Also, `react` devs, we've got you! `jsx` and `tsx` support is on they way, just chill.
### Deploy Locally
To test your design, you can deploy locally. Run:

`monagree deploy -l`
> Dont forget the `-l` flag  

To deploy a specific branch only run:

`monagree deploy -l -b BRANCH_ID`
> Replace `BRANCH_ID` with your branch id  

These commands will craete a local server running on your localhost (usually at `port 3310`). Run `ctr + c` to terminate the server  
> *The CLI now supports hot reload. Just save and changes will reflect*

### Deploy Online
> **NOTE:** Make sure you have `git` installed on youyr machine   

Until someone buys your design on Monagree, your design will be hosted on your GitHub account. Dont worry, we will do this automatically. To begin, run:

`monagree deploy`
> *Note the absence of the -l flag*  

> Run `monagree deploy -b BRANCH_ID` to deploy a specific branch  

These commands will help you link your github to the Monagree CLI so we can host your site there. 
> **NOTE 1:** Use the Github of the person/team developing this account  

> **NOTE 2:** If you havent, we will guide you to generate an `ACCESS_TOKEN` for us. Make sure its a long lasting one and grant the `repo` permission. More on this in the CLI  

> **NOTE 3:** Do not edit anything in the repo created by the CLI  

## Why use the CLI
This tool is useful if you or your business (client) dont have a domain. The CLI will help you structure your codes an automatically host it for you on your Github profile. This, however, is temporary as your design will be moved to Monagree's global CDN once someone buys it.
## Developer Support
We are available to help - devs@monagree.com