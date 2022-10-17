# Contributing

## Participation

1. Assign yourself to an open git issue
    * To suggest a new feature or bugfix:
      * Check it does not already exist first! If it doesn't then:
      * Open github issue
      * Label it accordingly
      * Discuss with project members on discord or through github
2. Create a branch with `<issue-number>-<branch-descriptor>` naming scheme [ *(see article)*](https://deepsource.io/blog/git-branch-naming-conventions/)
3. Work on assigned issue
    * Try not to go outside the scope of the git issue
      * discuss with project members if you end up having to implement new features outside of the original scope
4. Sync branch with develop
    * `git fetch`
    * `git merge develop`
5. Create remote branch and push to that branch
    * `git push origin <issue-number>-<branch-descriptor>`
6. Start the [pull request process](#pull-request-process)

## Git workflow: Issue branching

* Branches are created from issues/ tasks
* Branches have the same name of its issue id#
* One Branch per issue and one issue per branch
* see [article](https://medium.com/flexisaf/git-workflow-for-your-project-3d9dbdc5f8e2) for more information

## Coding Style & Info

* TypeScript (require & module.exports)
  * use camelCase for function & variable naming
  * use PascalCase for Type, Interface, Namespace & Enum naming
  * prefer `===` over `==` 
* Functional (avoid OOP & classes)
* Use arrow functions where possible
* Async/ Await where possible
* Remember to format file with Prettier

## Project setup

* Clone project repo
* Run `npm install`
* Copy `sample.env` and rename to `.env`

## Running project
* To start frontend:
  * `cd client`
  * `npm run dev` 
* To start backend:
  * `cd server`
  * With Docker
    * Run `npm run db:docker:up` to start database
    * Run `npm run db:docker:down` to stop database
  * Without docker
    * TODO: Determine steps for running without Docker
  * `npm run start`

## Pull Request Process

1. Create branch with correct naming scheme (see [Participation](#participation))
2. Ensure code is working properly
3. Select branch on repository home page then click Create Pull Request 
   * Make sure it lists your branch `<issue-number>-<branch-descriptor>` merges into `develop` branch
   * Fill out description make sure to include `Closes #<issue-number>` to ensure issue is closed after merge
4. Code review must be completed by running the code and ensuring code meets our coding standards (see [Coding Style](#coding-style-&-info))
    * *review is not necessary if PR is related to documentation or project maintenance*
    * Must have 2 approvals for a PR before merge
7. Upon approving PR:
    * Merge PR into `develop` branch (*use Squash and Merge option*)

## Code of Conduct

*See [Contributors Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.txt)*
